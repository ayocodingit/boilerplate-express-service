import Joi from 'joi'

export const LoginGoogleSchema = Joi.object({
  code: Joi.string()
    .required(),
  redirect_uri: Joi.string()
    .required()
    .uri(),
  code_verifier: Joi.string()
    .required()
})

export const SignUpGoogleSchema = Joi.object({
  role: Joi.string()
    .required()
})
