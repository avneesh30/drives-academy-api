import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: '195.35.6.228',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'drives_academy_db'
    },
    migrations: {
      directory: "./src/migrations"
    },
    seeds: {
      directory: "./src/seeds"
    }
  }
};

export default config;