import database from '../../../config/database'
import { User } from '../../auth/entity'
import { UserOauth } from '../entity'

const Users = () => database<User>('users')

export const getUserOauth = (data: UserOauth) => {
  return Users().where('oauth_code', data.sub)
    .orWhere('email', data.email)
    .first()
}
