import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {  
    await knex.schema.createTable('quizzes', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.enu('difficulty', ['Easy', 'Medium', 'Hard']).notNullable();
      table.integer('number_of_questions').notNullable();
      table.string('best_score');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {  
    await knex.schema.dropTable('quizzes');
}
