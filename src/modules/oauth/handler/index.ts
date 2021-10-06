import express, { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { Oauth as Service } from '../service'
import { validate } from '../../../helpers/validator'
import { Oauth as Schema } from '../schema'

const router = express.Router()

router.post('/signup-with-google', validate(Schema.SignUpGoogle, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.CREATED).json(await Service.signUp(req.body))
  } catch (error) {
    next(error)
  }
})

router.post('/login-with-google', validate(Schema.LoginGoogle, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.signIn(req.body))
  } catch (error) {
    next(error)
  }
})

export default router
