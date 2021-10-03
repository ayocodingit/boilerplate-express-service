import express from 'express'
import httpStatus from 'http-status'
import { loginService, logoutService, refreshTokenService, registerService } from '../service'
import { validate } from '../../../validator'
import { LoginSchema, RefreshTokenSchema, RegisterSchema } from '../schema'
import jwt from '../../../middleware/jwt'

const router = express.Router()

router.post('/register', validate(RegisterSchema, 'body'), async (req, res) => {
  try {
    await registerService(req.body)
    res.status(httpStatus.CREATED).json({ message: 'CREATED' })
  } catch (error) {
    res.status(error.code).json({ error: error.isObject ? JSON.parse(error.message) : error.message })
  }
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
    res.json(await refreshTokenService(req.body))
  } catch (error) {
    res.status(error.code).json({ error: error.message })
  }
})

router.post('/logout', jwt, validate(RefreshTokenSchema, 'body'), async (req, res) => {
  try {
    res.json(await logoutService(req.body))
  } catch (error) {
    res.status(error.code).json({ error: error.message })
  }
})

export default router
