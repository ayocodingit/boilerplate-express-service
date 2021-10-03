import database from '../../../config/database'
import { User, Token } from '../entity'
import { v4 as uuidv4 } from 'uuid'

const Users = () => database<User>('users')
const Tokens = () => database<Token>('tokens')

export const registerRepository = (data: User) => {
  return Users().insert(Object.assign(data, {
    created_at: new Date(),
    updated_at: new Date()
  }))
}

export const userRepository = (key: string, value: number | string) => {
  return Users().where(key, value).first()
}

export const storeRefreshTokenRepository = (data: Token) => {
  return Tokens().insert(Object.assign(data, {
    token: uuidv4(),
    created_at: new Date(),
    updated_at: new Date()
  }))
}

export const tokenRepository = (key: string, value: number | string) => {
  return Tokens().where(key, value).first()
}
