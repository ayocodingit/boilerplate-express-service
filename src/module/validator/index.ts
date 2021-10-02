import { Schema } from 'joi'
import messages from './messages'

const validate = (schema: Schema, property: string) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req[property], { abortEarly: false })
    if (error) {
      const { details } = error
      const rules: any = {}
      details.forEach(i => {
        rules[i.context.key] = [messages(i.type, i.context.label)]
      })
      res.status(422).json({ errors: rules })
    } else {
      next()
    }
  }
}

export default validate
