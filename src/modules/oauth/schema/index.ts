import Joi from 'joi'

const defaultSchema = {
  code: Joi.string()
    .required(),
  redirect_uri: Joi.string()
    .required()
    .uri(),
  code_verifier: Joi.string()
    .required()
}

export const LoginGoogleSchema = Joi.object({
  ...defaultSchema
})

export const SignUpGoogleSchema = Joi.object({
  ...defaultSchema,
  role: Joi.string()
    .required()
})
