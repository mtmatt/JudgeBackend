import mongoose from "mongoose"

const submissionSchema = new mongoose.Schema({
    createdTime: {
        type: mongoose.Schema.Types.Date,
        require: true,
    },
    status: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    language: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    problemID: {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    userSolution: {
        type: mongoose.Schema.Types.Array,
        require: true,
    },
    'userSolution.*.filename': {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    'userSolution.*.content': {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    'result.type': {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    'result.maxTime': {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    'result.maxMemory': {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    'result.individual': {
        type: mongoose.Schema.Types.Array,
        require: true,
    },
    'result.individual.*.type': {
        type: mongoose.Schema.Types.String,
        require: true,
    },
    'result.individual.*.time': {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
    'result.individual.*.memory': {
        type: mongoose.Schema.Types.Number,
        require: true,
    },
})

export const Submission = mongoose.model('Submission', submissionSchema)