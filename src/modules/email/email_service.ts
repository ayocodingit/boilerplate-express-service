import { Email as Entity } from '@/modules/email/email_entity'
import { Email as Repository } from '@/modules/email/email_repository'

export namespace Email {
  export const sendMail = (data: Entity.Payload) => {
    Repository.sendMail(data)
  }
}
