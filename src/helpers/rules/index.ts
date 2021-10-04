import httpStatus from 'http-status'
import database from '../../config/database'
import { HttpError } from '../../handler/exception'
import { message } from '../validator'

interface rulesInterface {
  result: boolean,
  errors?: {
    errors: {
      [key: string]: string[]
    }
  }
}

const rules: rulesInterface = {
  result: false
}

const data = (table: string, key: string, value: string, primaryKey?: string, primaryKeyValue?: string | number) => {
  const query = database(table).where(key, value)
  if (primaryKey && primaryKeyValue) query.where(primaryKey, '!=', primaryKeyValue)
  return query.first()
}

export const unique = async (table: string, key: string, value: string, primaryKey?: string, primaryKeyValue?: string | number): Promise<rulesInterface> => {
  const item: any = await data(table, key, value, primaryKey, primaryKeyValue)

  if (item) {
    rules.result = true
    rules.errors = {
      errors: {
        [key]: [message('.unique', key)]
      }
    }
    throw new HttpError(httpStatus.UNPROCESSABLE_ENTITY, JSON.stringify(rules.errors), true)
  } else rules.result = false

  return rules
}

export const exists = async (table: string, key: string, value: string): Promise<rulesInterface> => {
  const item: any = await data(table, key, value)

  if (!item) {
    rules.result = true
    rules.errors = {
      errors: {
        [key]: [message('.exists', key)]
      }
    }
    throw new HttpError(httpStatus.UNPROCESSABLE_ENTITY, JSON.stringify(rules.errors), true)
  } else rules.result = false

  return rules
}
