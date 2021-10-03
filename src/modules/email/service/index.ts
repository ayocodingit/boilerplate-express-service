import { Mail } from '../entity'
import { sendMailRepository } from '../repository'

export const sendMailService = (data: Mail) => {
  return sendMailRepository(data)
}
