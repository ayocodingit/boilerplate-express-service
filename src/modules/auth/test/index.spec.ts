/* eslint-disable no-undef */
import { loginService, registerService, logoutService, refreshTokenService } from '../service'

let auth: any = {}

describe('auth', () => {
  it('register test', async () => {
    const response = await registerService({
      email: 'test@gmail.com',
      username: 'test',
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
      email: 'test@gmail.com',
      password: 'admin'
    })
    auth = response
    expect(response)
  })
})

describe('auth', () => {
  it('refresh token test', async () => {
    const response = await refreshTokenService({
      refresh_token: auth.refreshToken
    })
    expect(response)
  })
})

describe('auth', () => {
  it('logout test', async () => {
    const response = await logoutService({
      refresh_token: auth.refreshToken
    })
    expect(response)
  })
})

describe('auth', () => {
  it('error logout test', async () => {
    try {
      await logoutService({
        refresh_token: '1234'
      })
    } catch (error) {
      expect(error)
    }
  })
})

describe('auth', () => {
  it('error refresh token test', async () => {
    try {
      await refreshTokenService({
        refresh_token: 1234
      })
    } catch (error) {
      expect(error)
    }
  })
})

describe('auth', () => {
  it('error refresh token user not found test', async () => {
    try {
      await refreshTokenService({
        refresh_token: auth.refreshToken
      })
    } catch (error) {
      expect(error)
    }
  })
})
