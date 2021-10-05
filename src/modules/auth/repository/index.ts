import database from '../../../config/database'
import { Auth as Entity } from '../entity'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import bcryptRounds from '../../../config/bcryptRounds'

const Users = () => database<Entity.User>('users')
const Tokens = () => database<Entity.Token>('tokens')
const timestamp = new Date()
export namespace Auth {
  export const register = (data: Entity.User) => {
    return Users().insert(Object.assign(data, {
      created_at: timestamp,
      updated_at: timestamp
    }))
  }

  export const user = (key: string, value: number | string) => {
    return Users().where(key, value).first()
  }

  export const storeRefreshToken = (data: Entity.Token) => {
    return Tokens().insert(Object.assign(data, {
      token: uuidv4(),
      created_at: timestamp,
      updated_at: timestamp
    }))
  }

  export const token = (key: string, value: number | string) => {
    return Tokens().where(key, value).first()
  }

  export const removeToken = (key: string, value: number | string) => {
    return Tokens().where(key, value).delete()
  }

  export const passwordHash = (password: string): string => {
    const salt = bcrypt.genSaltSync(bcryptRounds)
    return bcrypt.hashSync(password, salt)
  }
}
