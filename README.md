# JudgeBackend

## Protocal

Structure of different types of data.

### User

```js
{
    "_id": String,
    "username": String,
    "displayName": String,
    "password": String,
    "isAdmin": Boolean,
    "solvedProblem": Number,
    "solvedProblems": [String],
    "rating": Number,
}
```

### Problem

```js
{
    "_id": String,
    "displayID": String,
    "createdTime": Date,
    "title": String,
    "description": String,
    "inputFormat": String,
    "outputFormat": String,
    "timeLimit": Number,
    "memoryLimit": Number,
    "scorePolicy": String,
    "testcases": [
        {
            "input": String,
            "output": String,
            "point": Number,
            "subtask": String
        }
    ]
}
```

### Submission

```js
{
    "_id": String,
    "createdTime": Date,
    "status": String,
    "language": String,
    "username": String,
    "problemID": String,
    "userSolution": [
        {
            "filename": String,
            "content": String
        }
    ],
    "result": {
        "status": String,
        "maxTime": Number,
        "maxMemory": Number,
        "individual": [
            {
                "status": String,
                "time": Number,
                "memory": Number
            }
        ]
    }
}
```

## API

- User
    - GET /api/users
    - POST /api/users
- Problems
    - GET /api/problems
    - POST /api/problems
- Submissions
    - GET /api/submissions
    - POST /api/submissions