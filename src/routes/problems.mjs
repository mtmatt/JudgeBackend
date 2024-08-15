import { Router } from "express"
import { query, validationResult, matchedData, checkSchema, check } from "express-validator"
import { Problem } from "../mongoose/schemas/problems.mjs"
import { createProblemValidation } from "../utils/create-problem-validation.mjs"

const problemsRouter = Router()

problemsRouter.get('/api/problems', async (request, response) => {
    try {
        const problems = await Problem
            .find()
            .select('id displayID title createdTime')
            .sort({ createdTime: -1 })
        return response.status(200).send(problems)
    }
    catch (error) {
        if (error) {
            return response.status(400).send(error)
        }
    }
})

problemsRouter.post('/api/problems', 
    checkSchema(createProblemValidation), 
    async (request, response) => {
        const result = validationResult(request)
        if (!result.isEmpty()) {
            return response.status(400).send(result.array())
        }
        const data = matchedData(request)
        const newProblem = new Problem(data)
        try {
            newProblem.createdTime = Date.now()
            const savedProblem = await newProblem.save()
            return response.status(201).send(newProblem)
        }
        catch (error) {
            console.log(`Error: ${error}`)
            return response.status(400).send(error)
        }
    }
)

export default problemsRouter