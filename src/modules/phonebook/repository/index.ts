import database from '../../../config/database'
import { phonebook } from '../entity'
// import { v4 as uuidv4 } from 'uuid';

const Phonebooks = () => database<phonebook>('phonebooks')

export const indexRepository = (perPage: number = 10, currentPage: number = 1) => {
  return Phonebooks().paginate({ perPage, currentPage })
}

export const storeRepository = (data: phonebook) => {
  return Phonebooks().insert(Object.assign(data, {
    created_at: new Date(),
    updated_at: new Date()
  }))
}
