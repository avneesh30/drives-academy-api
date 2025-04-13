import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {  
    await knex.schema.createTable('questions', (table) => {
      table.increments('id').primary();
      table.integer('quiz_id').unsigned().notNullable();
      table.foreign('quiz_id').references('id').inTable('quizzes').onDelete('CASCADE');
      table.text('question_text').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {  
    await knex.schema.dropTable('questions');
}
