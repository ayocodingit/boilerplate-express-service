import Joi from 'joi'

export namespace Oauth {
  const defaultSchema = {
    code: Joi.string()
      .required(),
    redirect_uri: Joi.string()
      .required()
      .uri(),
    code_verifier: Joi.string()
      .required()
  }

  export const LoginGoogle = Joi.object({
    ...defaultSchema
  })

  export const SignUpGoogle = Joi.object({
    ...defaultSchema,
    role: Joi.string()
      .required()
  })
}
