import { knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import config from '.'

const database = knex({
  client: config.get('db.connection'),
  connection: {
    host: config.get('db.host'),
    port: config.get('db.port'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.database')
  },
  pool: {
    min: Number(config.get('db.pool.min', 10)),
    max: Number(config.get('db.pool.max', 100))
  }
})

attachPaginate()

export default database
