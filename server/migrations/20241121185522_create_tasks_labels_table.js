export const up = (knex) => (
  knex.schema.createTable('tasks_labels', (table) => {
    table.increments('id').primary();
    table.integer('task_id').unsigned().notNullable().references('id')
      .inTable('tasks')
      .onDelete('CASCADE');
    table.integer('label_id').unsigned().notNullable().references('id')
      .inTable('labels');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('tasks_labels');
