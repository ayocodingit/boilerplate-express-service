import { registerService } from '../service'

describe('auth', () => {
  it('should resolve with true and valid userId for hardcoded token', async () => {
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
