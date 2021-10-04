import express from 'express'
import httpStatus from 'http-status'
import { signInService, signUpService } from '../service'
import { validate } from '../../../helpers/validator'
import { LoginGoogleSchema, SignUpGoogleSchema } from '../schema'

const router = express.Router()

router.post('/signup-with-google', validate(SignUpGoogleSchema, 'body'), async (req, res, next) => {
  try {
    res.status(httpStatus.CREATED).json(await signUpService(req.body))
  } catch (error) {
    next(error)
  }
})

router.post('/login-with-google', validate(LoginGoogleSchema, 'body'), async (req, res, next) => {
  try {
    res.json(await signInService(req.body))
  } catch (error) {
    next(error)
  }
})

export default router
