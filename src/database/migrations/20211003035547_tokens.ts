import { Knex } from 'knex'

export const up = async (knex: Knex) => {
  return knex.schema.hasTable('tokens').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('tokens', function (table) {
        table.increments()
        table.integer('user_id')
        table.string('token', 255).notNullable().unique().index()
        table.boolean('is_revoked').defaultTo(false)
        table.timestamps()
      })
    }
  })
}

export const down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTableIfExists('tokens')
}
