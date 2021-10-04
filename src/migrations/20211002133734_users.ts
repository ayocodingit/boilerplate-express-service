import { Knex } from 'knex'

export const up = async (knex: Knex): Promise<any> => {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('email').notNullable()
    table.string('username').notNullable()
    table.string('role').notNullable()
    table.string('password')
    table.string('avatar')
    table.string('oauth_code')
    table.boolean('is_active')
    table.timestamps()
  })
}

export const down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable('users')
}
