import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('lesson_contents', (table) => {
    table.increments('id').primary();
    table.integer('driving_lesson_id').unsigned().notNullable();
    table
      .foreign('driving_lesson_id')
      .references('id')
      .inTable('driving_lessons')
      .onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('order').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('lesson_contents');
}
