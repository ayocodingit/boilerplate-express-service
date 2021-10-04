import { Jwt, Token, User } from '../entity'
import { tokenRepository, userRepository, registerRepository, storeRefreshTokenRepository, passwordHashRepository, removeTokenRepository } from '../repository'
import bcrypt from 'bcrypt'
import { HttpError } from '../../../handler/exception'
import httpStatus from 'http-status'
import lang from '../../../lang'
import jwt from 'jsonwebtoken'
import config from '../../../config'
import { unique } from '../../../helpers/rules'

export const registerService = async (body: any) => {
  await unique('users', 'email', body.email)

  const data: User = {
    email: body.email,
    username: body.username,
    role: body.role,
    password: passwordHashRepository(body.password),
    is_active: false
  }

  return registerRepository(data)
}

export const loginService = async (body: any) : Promise<Jwt> => {
  const user: User = await userRepository('email', body.email)
  if (!user) throw new HttpError(httpStatus.NOT_FOUND, lang.__('auth.user.failed'))

  const match = await bcrypt.compare(body.password, user.password)
  if (!match) throw new HttpError(httpStatus.NOT_FOUND, lang.__('auth.password.failed'))

  return await responseJwt(user)
}

export const refreshTokenService = async (body: any): Promise<Jwt> => {
  const token: Token = await tokenRepository('token', body.refresh_token)
  if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))

  const user: User = await userRepository('id', token.user_id)
  return await responseJwt(user, token.token)
}

export const logoutService = async (body: any) => {
  const token = await removeTokenRepository('token', body.refresh_token)
  if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))
  return { message: 'logout success' }
}

export const responseJwt = async (user: User, tokenOld?: string): Promise<Jwt> => {
  delete user.password
  const jwt = generateToken(user)
  const token = tokenOld || await generateRefreshToken(user)

  return {
    type: 'bearer',
    token: jwt,
    refreshToken: token,
    user: user
  }
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    { uid: user.id, user },
    config.get('jwt.secret'),
    {
      expiresIn: Number(config.get('jwt.ttl')),
      algorithm: 'RS256'
    }
  )
}

export const generateRefreshToken = async (user: User): Promise<string> => {
  const tokens = await storeRefreshTokenRepository({
    user_id: user.id,
    is_revoked: false
  })

  const token = await tokenRepository('id', tokens[0])

  return token.token
}
