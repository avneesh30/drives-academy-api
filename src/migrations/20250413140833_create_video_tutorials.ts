import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {  
    await knex.schema.createTable('video_tutorials', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.string('duration').notNullable();
      table.string('video_url').notNullable();
      table.string('thumbnail_url').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {  
    await knex.schema.dropTable('video_tutorials');
}

