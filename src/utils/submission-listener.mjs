import { Problem } from '../mongoose/schemas/problems.mjs'
import { Submission } from '../mongoose/schemas/submission.mjs'
import { sleep } from './sleep.mjs'
import { exec } from 'child_process'

const judge = async (submission) => {
    const problem = await Problem.findOne({ displayID: submission.problemID })
    console.log(problem)
}

export const submissionListener = async () => {
    while (true) {
        const pendingSubmissions = await Submission.find({ status: 'pending' }).sort({ createdTime: -1 })
        const firstSubmission = pendingSubmissions[0]
        if (firstSubmission) {
            await judge(firstSubmission)
        }
        await sleep(5000)
    }
}