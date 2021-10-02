import Joi from 'joi'

export const StoreSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .required(),
  phone_number: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required()
})
