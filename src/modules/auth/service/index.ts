import { User } from '../entity'
import { tokenRepository, userRepository, registerRepository, storeRefreshTokenRepository } from '../repository'
import bcrypt from 'bcrypt'
import bcryptRounds from '../../../config/bcryptRounds'
import { HttpError } from '../../../handler/exception'
import httpStatus from 'http-status'
import lang from '../../../lang'
import jwt from 'jsonwebtoken'
import config from '../../../config'

export const registerService = (body: any) => {
  const salt = bcrypt.genSaltSync(bcryptRounds)
  const password = bcrypt.hashSync(body.password, salt)

  const data: User = {
    email: body.email,
    username: body.username,
    role: body.role,
    password: password,
    is_active: true
  }

  return registerRepository(data)
}

export const loginService = async (body: any) => {
  const user: User = await userRepository('email', body.email)
  if (!user) throw new HttpError(httpStatus.NOT_FOUND, lang.__('auth.user.failed'))

  const match = await bcrypt.compare(body.password, user.password)
  if (!match) throw new HttpError(httpStatus.NOT_FOUND, lang.__('auth.password.failed'))

  delete user.password

  return await responseJwtService(user)
}

export const responseJwtService = async (user: User, tokenOld?: string) => {
  const jwt = generateTokenJwt(user)
  const token = tokenOld || await refreshToken(user)

  return {
    type: 'bearer',
    token: jwt,
    refreshToken: token,
    user: user
  }
}

export const tokenService = (body: any) => {
  return tokenRepository('token', body.refresh_token)
}

export const userService = (id: number | string) => {
  return userRepository('id', id)
}

const generateTokenJwt = (user: User) => {
  delete user.password
  return jwt.sign(
    { uid: user.id, user },
    config.get('jwt.secret'),
    {
      expiresIn: config.get('jwt.ttl'),
      algorithm: 'RS256'
    }
  )
}

const refreshToken = async (user: User) => {
  const tokens = await storeRefreshTokenRepository({
    user_id: user.id,
    is_revoked: false
  })

  const token = await tokenRepository('id', tokens[0])

  return token.token
}
