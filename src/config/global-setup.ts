import { knex } from 'knex'
import config from '.'
import knexfile from '../knexfile'

const createTestDatabase = async () => {
  const Knex = knex(knexfile[config.get('node.env')])
  try {
    await Knex.migrate.latest()
  } catch (error) {
    throw new Error(error)
  } finally {
    await Knex.destroy()
  }
}

export default async () => {
  try {
    await createTestDatabase()
    console.log('Test database created successfully')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
