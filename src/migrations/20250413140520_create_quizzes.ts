import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('quizzes', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.enu('difficulty', ['Beginner', 'Intermediate', 'Advanced']).notNullable();
    table
      .enu('category', [
        'Road Signs',
        'Traffic Rules',
        'Vehicle Control',
        'Safety',
        'Emergency Procedures',
      ])
      .notNullable();
    table.integer('time_limit_minutes').notNullable().defaultTo(30);
    table.integer('passing_score').notNullable().defaultTo(70);
    table.integer('number_of_questions').notNullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('quizzes');
}
