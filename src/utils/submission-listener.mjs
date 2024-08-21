import { Problem } from '../mongoose/schemas/problems.mjs'
import { Submission } from '../mongoose/schemas/submission.mjs'
import { sleep } from './sleep.mjs'
import util from 'util'
import child_process from 'child_process'
import FileSystem from 'fs'

const aexec = util.promisify(child_process.exec);

const compile = async (submission) => {
    const { userSolution } = submission
    for (let i = 0; i < userSolution.length; ++i) {
        FileSystem.writeFileSync('./user-solutions/' + userSolution[i].filename, userSolution[i].content)
    }
    const compileResult = await aexec('gcc ./user-solutions/main.c -O2 -o ./user-solutions/main')
    if (compileResult.error) {
        console.log(compileResult.error)
        await Submission.findByIdAndUpdate(submission.id, { status: 'CE' })
        return false
    }
    return true
}

const runSandbox = async (submission) => {
    const sandbox = await aexec('isolate --run -i input -o output --mem=262144 --time=1 --meta=user-solutions/meta.out -- main')
    if (sandbox.error) {
        console.log(sandbox.error)
        submission.result.individual[i].status = 'RE'
        await Submission.findByIdAndUpdate(submission.id, submission)
        return false
    }
    return true
}

const getMeta = () => {
    const meta = FileSystem.readFileSync('./user-solutions/meta.out').toString()
        .trim().split('\n')
    let parsedMeta = {}
    meta.forEach((line) => {
        const [name, value] = line.split(':')
        parsedMeta[name] = value
    })
    return parsedMeta
}

const run = async (submission, isolateFolder) => {
    const problem = await Problem.findOne({ displayID: submission.problemID })
    let status = 'AC'
    let point = 0
    for (let i = 0; i < problem.testcase.length; ++i) {
        FileSystem.writeFileSync(isolateFolder + 'input', problem.testcase[i].input)
        await aexec('mv ./user-solutions/main ' + isolateFolder + 'main')
        const meta = getMeta()
        if (parseInt(meta['time-wall']) > problem.timeLimit) status = 'TLE'
        submission.result.individual[i].time = parseInt(meta['time-wall'])
        submission.result.individual[i].memory = parseInt(meta['max-rss'])
        if (!await runSandbox(submission)) {
            submission.result.individual[i].status = 'RE'
            if (status !== 'TLE') status = 'RE'
            continue
        }

        const userOutput = FileSystem.readFileSync(isolateFolder + 'output').toString()
        const answer = problem.testcase[i].output
        if (userOutput.trim() === answer.trim()) {
            submission.result.individual[i].status = 'AC'
            point += problem.testcase[i].point
        }
        else {
            if (status === 'AC') status = 'WA' 
            submission.result.individual[i].status = 'WA'
        }
        await Submission.findByIdAndUpdate(submission.id, submission)
    }
    submission.status = status
    submission.result.status = point
}

const judge = async (submission) => {
    const init = await aexec('isolate --init')
    if (init.error) {
        console.log(init.error)
        return
    }
    const isolateFolder = init.stdout.substring(0, init.stdout.length - 1) + '/box/'
    if (!await compile(submission)) {
        return
    }
    await run(submission, isolateFolder)
}

export const submissionListener = async () => {
    while (true) {
        const timer = sleep(5000)
        const pendingSubmissions = await Submission.find({ status: 'pending' }).sort({ createdTime: -1 })
        const firstSubmission = pendingSubmissions[0]
        if (firstSubmission) {
            await judge(firstSubmission)
        }
        await timer
    }
}