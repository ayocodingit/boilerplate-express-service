import { Knex } from 'knex'

export const up = (knex: Knex): Knex.SchemaBuilder => {
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

export const down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTableIfExists('users')
}
