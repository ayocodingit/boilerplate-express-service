import httpStatus from 'http-status'
import { Schema } from 'joi'
import lang from '../../../lang'

export const validate = (schema: Schema, property: string) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req[property], { abortEarly: false })
    if (error) {
      const { details } = error
      const rules: any = {}
      details.forEach(i => {
        rules[i.context.key] = [message(i.type, i.context.label)]
      })
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: rules })
    } else {
      next()
    }
  }
}

export const message = (type: string, label: string) => {
  const rule = type.split('.')[1]

  return lang.__(`validation.${rule}`, { attribute: label })
}
