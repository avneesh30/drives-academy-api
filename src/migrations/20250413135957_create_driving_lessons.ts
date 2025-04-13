import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> { 
    await knex.schema.createTable('driving_lessons', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.integer('duration').notNullable(); // Duration in minutes
      table.boolean('is_locked').notNullable().defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('driving_lessons');
}

