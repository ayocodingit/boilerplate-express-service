import { Email as Entity } from '../entity'
import { Email as Repository } from '../repository'

export namespace Email {
  export const sendMail = (data: Entity.Payload) => {
    Repository.sendMail(data)
  }
}
