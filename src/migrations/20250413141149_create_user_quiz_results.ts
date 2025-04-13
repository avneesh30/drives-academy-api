import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_quiz_results', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('quiz_id').unsigned().notNullable();
    table.foreign('quiz_id').references('id').inTable('quizzes').onDelete('CASCADE');
    table.integer('score').notNullable();
    table.integer('total_points').notNullable();
    table.integer('correct_answer_count').notNullable();
    table.integer('incorrect_answer_count').notNullable();
    table.integer('time_taken_seconds').notNullable();
    table.boolean('is_passed').notNullable();
    table.jsonb('question_answers').notNullable().defaultTo('[]');
    table.timestamp('started_at').notNullable();
    table.timestamp('completed_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_quiz_results');
}
