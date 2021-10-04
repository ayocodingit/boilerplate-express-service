import { Mail } from '../entity'
import { sendMailRepository } from '../repository'

export const sendMailService = (data: Mail) => {
  sendMailRepository(data)
}
