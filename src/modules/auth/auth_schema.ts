import Joi from 'joi'
export namespace Auth {
  export const Register = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    username: Joi.string()
      .required(),
    role: Joi.string()
      .required(),
    password: Joi.string()
      .required(),
    avatar: Joi.string()
      .allow(null),
    oauth_code: Joi.string()
      .allow(null)
  })

  export const Login = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
  })

  export const RefreshToken = Joi.object({
    refresh_token: Joi.string().required()
  })
}
