import express, { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { Auth as Service } from './auth_service'
import { validate } from '../../helpers/validator'
import { Auth as Schema } from './auth_schema'
import jwt from '../../middleware/jwt'

const router = express.Router()

router.post('/register', validate(Schema.Register, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Service.register(req.body)
    res.status(httpStatus.CREATED).json({ message: 'CREATED' })
  } catch (error) {
    next(error)
  }
})

router.post('/login', validate(Schema.Login, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.login(req.body))
  } catch (error) {
    next(error)
  }
})

router.get('/user', jwt, async (req, res) => {
  const users: any = req.user
  res.json(users.user)
})

router.post('/refresh-token', jwt, validate(Schema.RefreshToken, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.refreshToken(req.body))
  } catch (error) {
    next(error)
  }
})

router.post('/logout', jwt, validate(Schema.RefreshToken, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.logout(req.body))
  } catch (error) {
    next(error)
  }
})

export default router
