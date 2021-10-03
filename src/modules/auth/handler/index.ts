import express from 'express'
import httpStatus from 'http-status'
import { loginService, registerService, responseJwtService, tokenService, userService } from '../service'
import { validate } from '../../../validator'
import { unique } from '../../../rules'
import { LoginSchema, RefreshTokenSchema, RegisterSchema } from '../schema'
import jwt from '../../../middleware/jwt'
import { Token, User } from '../entity'
import { HttpError } from '../../../handler/exception'
import lang from '../../../lang'

const router = express.Router()

router.post('/register', validate(RegisterSchema, 'body'), async (req, res) => {
  const rules = await unique('users', 'email', req.body.email)
  if (rules.result) return res.json(rules.errors)

  await registerService(req.body)
  res.status(httpStatus.CREATED).json({ message: 'CREATED' })
})

router.post('/login', validate(LoginSchema, 'body'), async (req, res) => {
  try {
    res.json(await loginService(req.body))
  } catch (error) {
    res.status(error.code).json({ error: error.message })
  }
})

router.get('/user', jwt, async (req, res) => {
  const users: any = req.user
  res.json(users.user)
})

router.post('/refresh-token', jwt, validate(RefreshTokenSchema, 'body'), async (req, res) => {
  try {
    const token: Token = await tokenService(req.body)
    if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))
    const user: User = await userService(token.user_id)
    if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))
    res.json(await responseJwtService(user, token.token))
  } catch (error) {
    res.status(error.code).json({ error: error.message })
  }
})

export default router
