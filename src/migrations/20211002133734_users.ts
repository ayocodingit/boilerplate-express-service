import { Knex } from 'knex'

export async function up (knex: Knex): Promise<any> {
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

export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('users')
}
