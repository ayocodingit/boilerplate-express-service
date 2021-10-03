export interface SignUpGoogle {
  code: string
  redirect_uri: string
  codeVerifier: string
}

export interface UserOauth {
  sub: string
  email: string
}
