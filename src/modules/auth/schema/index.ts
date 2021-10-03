import Joi from 'joi'

export const RegisterSchema = Joi.object({
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

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
})

export const RefreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required()
})
