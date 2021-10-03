import express from 'express'
import httpStatus from 'http-status'
import { signInService, signUpService } from '../service'
import { validate } from '../../../validator'
import { LoginGoogleSchema, SignUpGoogleSchema } from '../schema'

const router = express.Router()

router.post('/signup-with-google', validate(SignUpGoogleSchema, 'body'), async (req, res) => {
  try {
    res.status(httpStatus.CREATED).json(await signUpService(req.body))
  } catch (error) {
    res.status(error.code).json({ error: error.isObject ? JSON.parse(error.message) : error.message })
  }
})

router.post('/login-with-google', validate(LoginGoogleSchema, 'body'), async (req, res) => {
  try {
    res.json(await signInService(req.body))
  } catch (error) {
    res.status(error.code).json({ error: error.message })
  }
})

export default router
