# JudgeBackend

## Protocal

Structure of different types of data.

### User

```json
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

```json
{
    "_id": String,
    "displayID": String,
    "description": String,
    "input": String,
    "output": String,
    "testcases": [{
        "input": String,
        "output": String,
    }]
}
```

## API

- User
    - GET /api/users
    - POST /api/users
- Problems
    - GET /api/problems
    - POST /api/problems