import { message } from ".."
import database from "../../../../config/database"

interface rulesInterface {
  result: boolean,
  errors?: {
    errors: {
      [key: string]: string[]
    }
  }
}

const data = (table: string, key: string, value: string) => {
  return database(table).where(key, value).first()
}

const rules: rulesInterface = {
  result: false,
}

export const unique = async (table: string, key: string, value: string): Promise<rulesInterface> => {
  const item: any = await data(table, key, value)

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

  if (!item) rules.result = false
  rules.result = true

  rules.errors = {
    errors: {
      [key]: [message('.exists', key)]
    }
  }

  return rules
}