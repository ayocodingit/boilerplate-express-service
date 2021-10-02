import { phonebook } from '../entity'
import { indexRepository, storeRepository } from '../repository'

export const indexService = () => {
  return indexRepository()
}

export const storeService = (body: any) => {
  const data: phonebook = {
    name: body.name,
    phone_number: body.phone_number,
    email: body.email
  }
  return storeRepository(data)
}
