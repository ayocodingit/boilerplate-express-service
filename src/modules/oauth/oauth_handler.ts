import express, { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { Oauth as Service } from './oauth_service'
import { validate } from '../../helpers/validator'
import { Oauth as Schema } from './oauth_schema'

const router = express.Router()

router.post('/signup-with-google', validate(Schema.SignUpGoogle, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(httpStatus.CREATED).json(await Service.signUp({
      code: req.body.code,
      redirect_uri: req.body.redirect_uri,
      code_verifier: req.body.code_verifier,
    }))
  } catch (error) {
    next(error)
  }
})

router.post('/login-with-google', validate(Schema.LoginGoogle, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.signIn({
      code: req.body.code,
      redirect_uri: req.body.redirect_uri,
      code_verifier: req.body.code_verifier,
      role: req.body.role
    }))
  } catch (error) {
    next(error)
  }
})

export default router
