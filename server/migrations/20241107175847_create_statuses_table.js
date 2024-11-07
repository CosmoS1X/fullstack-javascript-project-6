export const up = (knex) => (
  knex.schema.createTable('statuses', (table) => {
    table.increments('id').primary();
    table.string('status_name');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('statuses');
