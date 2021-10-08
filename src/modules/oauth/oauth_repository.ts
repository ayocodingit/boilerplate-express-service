import { Oauth as Entity } from './oauth_entity'
import { HttpError } from '../../handler/exception'
import { OAuth2Client } from 'google-auth-library'
import config from '../../config'
import httpStatus from 'http-status'
import { Auth as Repository } from '../auth/auth_repository'

export namespace Oauth {
  export const userOauth = (data: Entity.UserOauth) => {
    return Repository.Users().where('oauth_code', data.sub)
      .orWhere('email', data.email)
      .first()
  }

  export const tokenInfoGoogle = async (data: Entity.SignUpGoogle) => {
    try {
      const googleClient = new OAuth2Client(config.get('google.client.id'), config.get('google.client.secret'))
      const { tokens } = await googleClient.getToken(data)
      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token
      })
      return ticket.getPayload()
    } catch (error) {
      console.log(error.message)
      throw new HttpError(httpStatus.UNAUTHORIZED, error.message)
    }
  }
}
