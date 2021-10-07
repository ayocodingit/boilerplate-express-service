import express, { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { Auth as Service } from './auth_service'
import { Auth as Entity } from './auth_entity'
import { validate } from '../../helpers/validator'
import { Auth as Schema } from './auth_rules'
import jwt from '../../middleware/jwt'

const router = express.Router()

router.post('/register', validate(Schema.Register, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Service.register({
      email: req.body.email,
      username: req.body.username,
      role: req.body.role,
      password: req.body.password,
      is_active: false,
    })
    res.status(httpStatus.CREATED).json({ message: 'CREATED' })
  } catch (error) {
    next(error)
  }
})

router.post('/login', validate(Schema.Login, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.login({
      email: req.body.email,
      password: req.body.password,
    }))
  } catch (error) {
    next(error)
  }
})

router.get('/user', jwt, async (req, res) => {
  const users: Entity.RequestJwtUser = req.user
  res.json(users.user)
})

router.post('/refresh-token', jwt, validate(Schema.RefreshToken, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.refreshToken({
      refresh_token: req.body.refresh_token
    }))
  } catch (error) {
    next(error)
  }
})

router.post('/logout', jwt, validate(Schema.RefreshToken, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await Service.logout({
      refresh_token: req.body.refresh_token
    }))
  } catch (error) {
    next(error)
  }
})

export default router
