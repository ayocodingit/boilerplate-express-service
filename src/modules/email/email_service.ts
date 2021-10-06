import { Email as Entity } from './email_entity'
import { Email as Repository } from './email_repository'

export namespace Email {
  export const sendMail = (data: Entity.Payload) => {
    Repository.sendMail(data)
  }
}
