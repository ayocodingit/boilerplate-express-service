import httpStatus from 'http-status'
import { Schema } from 'joi'
import lang from '../lang'

export const validate = (schema: Schema, property: string) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req[property], { abortEarly: false })
    if (error) {
      const { details } = error
      const rules: any = null
      details.forEach(i => {
        if (i.type === 'object.unknown') return
        rules[i.context.key] = [message(i.type, i.context.label)]
      })
      if (rules !== null) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: rules })
      } else {
        next()
      }
    } else {
      next()
    }
  }
}

export const message = (type: string, label: string) => {
  const rule = type.split('.')[1]

  return lang.__(`validation.${rule}`, { attribute: label })
}
