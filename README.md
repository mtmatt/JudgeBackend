# JudgeBackend

## Note

Developement has moved to https://github.com/HyperSoWeak/OwoJudge

## Install

Run following script as root

```bash
# mongodb
apt install -y docker.io
systemctl start docker
docker pull arm64v8/mongo
# node
apt install nodejs
apt install npm
apt install git
git clone https://github.com/mtmattqq/JudgeBackend.git
cd JudgeBackend
npm install
```

## Run

```bash
sudo docker run --name mongodb -d -p 27017:27017 arm64v8/mongo
# if the container name is used
sudo socker rm <container_id>
# and run docker run again
cd JudgeBackend
sudo npm run start
```
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
        ```
        Get all users from database if there's no query param. If filter 'field' and 'value' are given, this api will return those which 'field' contain 'value'

        Example:
            GET /api/users?filter=username&value=matt 
            GET /api/users?filter=displayName&value=koc 
        ```
    - GET /api/users/:username
        ```
        Get all field of single user with username.
        ```
    - POST /api/users
        ```
        Add an user into database. The user information should be placed in request body.

        Example:
        request.body = {
            "username": "matt",
            "displayName": "Matt",
            "password": "matt0ttam",
            "isAdmin": true
        }
        ```
    - DELETE /api/users/:username
        ```
        Delete the user with username.
        ```
    - PATCH /api/users/:username
        ```
        Update the user with data specified in request body.

        Example:
        request.body = {
            "displayName": "mtmattqq",
            "isAdmin": false,
        }
        ```
- Problems
    - GET /api/problems
        ```
        Get all problems from database. 
        ```
    - GET /api/problems/:displayID
        ```
        Get all field of a problem with displayID.
        ```
    - POST /api/problems
        ```
        Add a problem into database. The problem information should be placed in request body.
        
        Example:
        request.body = {
            "displayID": "hello world",
            "title": "Hello World",
            "description": "Print `Hello World` on the screen.",
            "inputFormat": "No input",
            "outputFormat": "As description said",
            "timeLimit": 80,
            "memoryLimit": 16384,
            "scorePolicy": "sum",
            "testcase": [
                {
                "input": "",
                "output": "Hello World",
                "point": 100,
                "subtask": "0"
                }
            ]
        }
        ```
    - DELETE /api/problems/:displayID
        ```
        Delete the problem with displayID.
        ```
    - PATCH /api/problems/:displayID
        ```
        Update the problem with data specified in request body.

        Example:
        request.body = {
            "title": "HelloWorld",
        }
        ```
- Submissions
    - GET /api/submissions
        ```
        Get all submissions from database.
        ```
    - POST /api/submissions
        ```
        Add a submission into database. The submission information should be placed into request body

        Example:
        request.body = {
            "problemID": "hello world",
            "username": "matt",
            "language": "gcc c11",
            "userSolution": [
                {
                "filename": "main.c",
                "content": "#include<stdio.h>\n\nint main(void) {\n    print(\"Hello World\");\n}"
                }  
            ]
        }
        ```
- Authentication
    - GET /api/auth/status
        ```
        Check whether you have loged in or not.
        ```
    - POST /api/auth
        ```
        Try to login with username and password. These two field should be placed in request body.

        Example:
        request.body = {
            "username": "matt",
            "password": "matt0ttam"
        }
        ```
