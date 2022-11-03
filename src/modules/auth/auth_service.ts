import { Auth as Entity } from '@/modules/auth/auth_entity'
import { Auth as Repository } from '@/modules/auth/auth_repository'
import bcrypt from 'bcrypt'
import { HttpError } from '@/handler/exception'
import httpStatus from 'http-status'
import lang from '@/lang'
import jwt from 'jsonwebtoken'
import config from '@/config'
import { checkError, uniqueRule } from '@/helpers/rules'

export namespace Auth {
  export const register = async (body: Entity.User) => {
    checkError(await uniqueRule('users', 'email', body.email))

    const data: Entity.User = {
      email: body.email,
      username: body.username,
      role: body.role,
      password: Repository.passwordHash(body.password),
      is_active: false
    }

    return Repository.register(data)
  }

  export const login = async (body: Entity.Login) : Promise<Entity.Jwt> => {
    const user: Entity.User = await Repository.user('email', body.email)
    if (!user) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))

    const match = await bcrypt.compare(body.password, user.password)
    if (!match) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.password.failed'))

    return responseJwt(user)
  }

  export const refreshToken = async (body: Entity.RefreshToken): Promise<Entity.Jwt> => {
    const token: Entity.Token = await Repository.token('token', body.refresh_token)
    if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))

    const user: Entity.User = await Repository.user('id', token.user_id)
    return responseJwt(user, token.token)
  }

  export const logout = async (body: Entity.RefreshToken) => {
    const token = await Repository.removeToken('token', body.refresh_token)
    if (!token) throw new HttpError(httpStatus.UNAUTHORIZED, lang.__('auth.user.failed'))
    return { message: 'logout success' }
  }

  export const responseJwt = async (user: Entity.User, tokenOld?: string): Promise<Entity.Jwt> => {
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

  export const generateToken = (user: Entity.User): string => {
    return jwt.sign(
      { uid: user.id, user },
      config.get('jwt.secret'),
      {
        expiresIn: Number(config.get('jwt.ttl')),
        algorithm: config.get('jwt.algorithm')
      }
    )
  }

  export const generateRefreshToken = async (user: Entity.User): Promise<string> => {
    const tokens = await Repository.storeRefreshToken({
      user_id: user.id,
      is_revoked: false
    })

    const token = await Repository.token('id', tokens[0])

    return token.token
  }
}
