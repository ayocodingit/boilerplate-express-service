import database from '../config/database'
import { phonebook } from '../entity'

const Phonebooks = () => database<phonebook>('phonebooks')

export const indexRepository = (perPage: number = 10, currentPage: number = 1) => {
  return Phonebooks().paginate({ perPage, currentPage })
}

export const storeRepository = (data: phonebook) => {
  return Phonebooks().insert(data)
}
