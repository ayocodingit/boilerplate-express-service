import { Knex } from 'knex'

export async function up (knex: Knex): Promise<any> {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('name')
    table.timestamps()
  })
}

export async function down (knex: Knex): Promise<any> {
  return knex.schema.dropTable('users')
}
