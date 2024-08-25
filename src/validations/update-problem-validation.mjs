export const updateProblemValidation = {
    title: {
        isLength: {
            options: {
                min: 4,
                max: 32,
            },
            errorMessage:
                'Length of title must between 4 to 32 characters',
        },
        isString: {
            errorMessage: 'Title should be a string',
        },
    },
    description: {
        isLength: {
            options: {
                min: 8,
                max: 4096,
            },
            errorMessage:
                'Length of description must between 8 to 4096 characters',
        },
        isString: {
            errorMessage: 'Description should be a string',
        },
    },
    inputFormat: {
        isLength: {
            options: {
                max: 4096,
            },
            errorMessage:
                'Length of inputFormat must less than 4096 characters',
        },
    },
    outputFormat: {
        isLength: {
            options: {
                max: 4096,
            },
            errorMessage:
                'Length of outputFormat must less than 4096 characters',
        },
    },
    timeLimit: {
        isInt: {
            min: 100,
            max: 10000,
            errorMessage: 'TimeLimit should be an integer between 100 to 10000 (in ms)',
        },
    },
    memoryLimit: {
        isInt: {
            min: 1024,
            max: 1048576,
            errorMessage: 'MemoryLimit should be an integer between 1024 to 1048576 (in KB)',
        },
    },
    scorePolicy: {
        isLength: {
            options: {
                max: 16,
            },
            errorMessage:
                'Length of scorePolicy must less than 16 characters',
        },
        isString: {
            errorMessage: 'ScorePolicy should be a string'
        },
    },
    testcase: {
        isArray: {
            errorMessage: 'Testcase should be an array'
        }
    },
    'testcase.*.input': {
        isLength: {
            options: {
                max: 10 * 1024 * 1024,
            },
            errorMessage:
                'Size of input in testcase must less than 10MB',
        },
    },
    'testcase.*.output': {
        isLength: {
            options: {
                max: 10 * 1024 * 1024,
            },
            errorMessage:
                'Size of output in testcase must less than 10MB',
        },
    },
    'testcase.*.point': {
        isInt: {
            errorMessage:
                'Point in testcase should be an integer',
        },
    },
    'testcase.*.subtask': {
        isLength: {
            options: {
                min: 1,
                max: 16,
            },
            errorMessage:
                'Length of subtask in testcase must between 1 to 16 characters',
        },
        isString: {
            errorMessage: 'Subtask in testcase should be a string'
        },
    },
}