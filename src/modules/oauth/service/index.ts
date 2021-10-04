import { SignUpGoogle } from '../entity'
import { getUserOauth } from '../repository'
import { HttpError } from '../../../handler/exception'
import httpStatus from 'http-status'
import { exists, unique } from '../../../helpers/rules'
import { responseJwt } from '../../auth/service'
import { OAuth2Client } from 'google-auth-library'
import config from '../../../config'
import { Jwt, User } from '../../auth/entity'
import { passwordHashRepository, registerRepository } from '../../auth/repository'
const googleClient = new OAuth2Client(config.get('google.client.id'), config.get('google.client.secret'))

export const signInService = async (body: any) : Promise<Jwt> => {
  const payload = await getTokenInfoGoogle({
    code: body.code,
    redirect_uri: body.redirect_uri,
    codeVerifier: body.code_verifier
  })

  await exists('users', 'email', payload.email)

  const user = await getUserOauth({
    sub: payload.sub,
    email: payload.email
  })

  return await responseJwt(user)
}

export const signUpService = async (body: any) => {
  const payload = await getTokenInfoGoogle({
    code: body.code,
    redirect_uri: body.redirect_uri,
    codeVerifier: body.code_verifier
  })

  await unique('users', 'email', payload.email)

  const data: User = {
    email: payload.email,
    username: payload.name,
    role: body.role,
    password: passwordHashRepository(Math.random().toString(36).substring(2, 15)),
    oauth_code: payload.sub,
    avatar: payload.picture,
    is_active: false
  }

  await registerRepository(data)

  const user = await getUserOauth({
    sub: payload.sub,
    email: payload.email
  })

  return await responseJwt(user)
}

const getTokenInfoGoogle = async (data: SignUpGoogle) => {
  try {
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
