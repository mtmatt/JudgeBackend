import { test, expect, vi, describe } from "vitest"
import { hashString } from "../utils/hash-password.mjs"

describe('hash-password', () => {
    test('should read salt from json', () => {
        hashString('this is a string')
    })
})