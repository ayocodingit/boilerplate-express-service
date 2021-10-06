export namespace Oauth {
  export interface SignUpGoogle {
    code: string
    redirect_uri: string
    codeVerifier: string
  }

  export interface UserOauth {
    sub: string
    email: string
  }

  export interface Schema {
    code: string
    redirect_uri: string
    code_verifier: string
    role?: string
  }
}
