import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('answers', (table) => {
    table.increments('id').primary();
    table.integer('question_id').unsigned().notNullable();
    table.foreign('question_id').references('id').inTable('questions').onDelete('CASCADE');
    table.text('answer_text').notNullable();
    table.boolean('is_correct').notNullable().defaultTo(false);
    table.string('image_url').nullable();
    table.integer('order').notNullable().defaultTo(0);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('answers');
}
