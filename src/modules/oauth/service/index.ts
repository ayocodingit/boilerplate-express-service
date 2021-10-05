import { Oauth as Repository } from '../repository'
import { checkError, existsRule, uniqueRule } from '../../../helpers/rules'
import { Auth as Service } from '../../auth/service'
import { Auth as AuthEntity } from '../../auth/entity'
import { Auth as AuthRepository } from '../../auth/repository'

export namespace Oauth {
  export const signIn = async (body: any) : Promise<AuthEntity.Jwt> => {
    const payload = await Repository.tokenInfoGoogle({
      code: body.code,
      redirect_uri: body.redirect_uri,
      codeVerifier: body.code_verifier
    })

    checkError(await existsRule('users', 'email', payload.email))

    const user = await Repository.userOauth({
      sub: payload.sub,
      email: payload.email
    })

    return await Service.responseJwt(user)
  }

  export const signUp = async (body: any) => {
    const payload = await Repository.tokenInfoGoogle({
      code: body.code,
      redirect_uri: body.redirect_uri,
      codeVerifier: body.code_verifier
    })

    checkError(await uniqueRule('users', 'email', payload.email))

    const data: AuthEntity.User = {
      email: payload.email,
      username: payload.name,
      role: body.role,
      password: AuthRepository.passwordHash(Math.random().toString(36).substring(2, 15)),
      oauth_code: payload.sub,
      avatar: payload.picture,
      is_active: false
    }

    await AuthRepository.register(data)

    const user = await Repository.userOauth({
      sub: payload.sub,
      email: payload.email
    })

    return await Service.responseJwt(user)
  }
}
