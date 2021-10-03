import { Jwt, Token, User } from '../entity'
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

  return await responseJwtService(user)
}

export const refreshTokenService = async (body: any) => {
  const token: Token = await tokenRepository('token', body.refresh_token)
  if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))

  const user: User = await userRepository('id', token.user_id)
  if (!user) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))

  return await responseJwtService(user, token.token)
}

const responseJwtService = async (user: User, tokenOld?: string): Promise<Jwt> => {
  delete user.password
  const jwt = generateTokenJwt(user)
  const token = tokenOld || await generateRefreshToken(user)

  return {
    type: 'bearer',
    token: jwt,
    refreshToken: token,
    user: user
  }
}

const generateTokenJwt = (user: User): string => {
  return jwt.sign(
    { uid: user.id, user },
    config.get('jwt.secret'),
    {
      expiresIn: Number(config.get('jwt.ttl')),
      algorithm: 'RS256'
    }
  )
}

const generateRefreshToken = async (user: User): Promise<string> => {
  const tokens = await storeRefreshTokenRepository({
    user_id: user.id,
    is_revoked: false
  })

  const token = await tokenRepository('id', tokens[0])

  return token.token
}
