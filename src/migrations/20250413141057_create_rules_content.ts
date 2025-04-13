import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('rules_content', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('id').inTable('rules_categories').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('rules_content');
}
