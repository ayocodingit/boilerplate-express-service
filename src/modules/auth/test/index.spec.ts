/* eslint-disable no-undef */
import { loginService, registerService, logoutService, refreshTokenService } from '../service'

let auth: any = {}

describe('auth', () => {
  it('register test', async () => {
    const response = await registerService({
      email: 'firman@gmail.com',
      username: 'firman',
      role: 'admin',
      password: 'admin',
      is_active: false
    })
    expect(response)
  })
})

describe('auth', () => {
  it('login test', async () => {
    const response = await loginService({
      email: 'firman@gmail.com',
      password: 'admin'
    })
    auth = response
    expect(response)
  })
})

describe('auth', () => {
  it('refresh token test', async () => {
    const response = await refreshTokenService({
      refresh_token: auth.refreshToken,
    })
    expect(response)
  })
})

describe('auth', () => {
  it('logout test', async () => {
    const response = await logoutService({
      refresh_token: auth.refreshToken,
    })
    expect(response)
  })
})
