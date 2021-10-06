export namespace Auth {
  export interface User {
    id?: string | number,
    email: string
    username: string
    role: string
    password: string
    avatar?: string
    oauth_code?: string
    is_active?: boolean
  }

  export interface Token {
    id?: string | number
    user_id: string | number
    token?: string
    is_revoked: boolean
  }

  export interface Jwt {
    type: string
    token: string
    refreshToken: string
    user: User
  }
}
