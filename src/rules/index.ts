import { message } from '../modules/phonebook/validator'
import database from '../config/database'

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

  if (item) rules.result = true
  else rules.result = false

  rules.errors = {
    errors: {
      [key]: [message('.unique', key)]
    }
  }

  return rules
}

export const exists = async (table: string, key: string, value: string): Promise<rulesInterface> => {
  const item: any = await data(table, key, value)

  if (!item) rules.result = true
  else rules.result = false

  rules.errors = {
    errors: {
      [key]: [message('.exists', key)]
    }
  }

  return rules
}
