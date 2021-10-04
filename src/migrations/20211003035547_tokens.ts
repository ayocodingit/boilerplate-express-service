import { Knex } from 'knex'

export const up = (knex: Knex): Promise<any> => {
  return knex.schema.createTable('tokens', function (table) {
    table.increments()
    table.integer('user_id')
    table.string('token', 255).notNullable().unique().index()
    table.boolean('is_revoked').defaultTo(false)
    table.timestamps()
  })
}

export const down = (knex: Knex): Promise<any> => {
  return knex.schema.dropTable('tokens')
}
