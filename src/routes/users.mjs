import { Router } from "express"
import { query, validationResult, matchedData, checkSchema } from "express-validator"
import { User } from "../mongoose/schemas/users.mjs"
import { createUserValidation } from '../utils/create-user-validation.mjs'
import { hashString } from '../utils/hash-password.mjs'

const usersRouter = Router()

usersRouter.get(
    '/api/users',
    query('filter')
        .isString().withMessage('filter should be a string')
        .notEmpty().withMessage('filter should not be empty')
        .isLength({ min: 2, max: 16 })
        .withMessage('filter should have length between 2 to 16'),
    query('value')
        .isString().withMessage('value should be a string')
        .notEmpty().withMessage('value should not be empty')
        .isLength({ min: 2, max: 64 })
        .withMessage('value should have length between 2 to 64'),
    async (request, response) => {
        const { query: { filter, value } } = request
        const result = validationResult(request)
        if (!filter && !value) {
            const users = await User.find().select('id username displayName').sort({ id: -1 })
            return response.status(200).send(users)
        }
        if (!result.isEmpty()) {
            console.log(result.array())
            return response.status(400).send(result.array())
        }
        try {
            const users = await User
                .find()
                .where(filter)
                .equals({ $regex: `.*${value}.*`, $options: 'i' })
                .select('id username displayName')
            return response.status(200).send(users)
        }
        catch (error) {
            console.log(error)
            return response.status(400).send(error)
        }
    }
)

usersRouter.post(
    '/api/users',
    checkSchema(createUserValidation),
    async (request, response) => {
        const result = validationResult(request)
        if (!result.isEmpty()) {
            return response.status(400).send(result.array())
        }
        const data = matchedData(request)
        const newUser = new User(data)
        try {
            newUser.password = hashString(newUser.password)
            newUser.solvedProblem = 0
            newUser.solvedProblems = []
            newUser.rating = 0
            const savedUser = await newUser.save()
            return response.status(201).send(savedUser)
        }
        catch (error) {
            console.log(`Error: ${error}`)
            return response.status(400).send(error)
        }
    }
)

export default usersRouter