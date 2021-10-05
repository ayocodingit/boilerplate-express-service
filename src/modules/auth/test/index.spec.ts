/* eslint-disable no-undef */
import { Auth as Service } from '../service'

let auth: any = {}

describe('auth', () => {
  it('register test', async () => {
    const response = await Service.register({
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
  it('error register email duplicate test', async () => {
    try {
      await Service.register({
        email: 'test@gmail.com',
        username: 'test',
        role: 'admin',
        password: 'admin',
        is_active: false
      })
    } catch (error) {
      expect(error)
    }
  })
})

describe('auth', () => {
  it('login test', async () => {
    const response = await Service.login({
      email: 'test@gmail.com',
      password: 'admin'
    })
    auth = response
    expect(response)
  })
})

describe('auth', () => {
  it('error login failed email test', async () => {
    try {
      await Service.login({
        email: 'test2@gmail.com',
        password: 'admin'
      })
    } catch (error) {
      expect(error)
    }
  })
})

describe('auth', () => {
  it('error login failed password test', async () => {
    try {
      await Service.login({
        email: 'test@gmail.com',
        password: 'admin123'
      })
    } catch (error) {
      expect(error)
    }
  })
})

describe('auth', () => {
  it('refresh token test', async () => {
    const response = await Service.refreshToken({
      refresh_token: auth.refreshToken
    })
    expect(response)
  })
})

describe('auth', () => {
  it('logout test', async () => {
    const response = await Service.logout({
      refresh_token: auth.refreshToken
    })
    expect(response)
  })
})

describe('auth', () => {
  it('error logout test', async () => {
    try {
      await Service.logout({
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
      await Service.refreshToken({
        refresh_token: 1234
      })
    } catch (error) {
      expect(error)
    }
  })
})
