import knex from 'knex';
import config from '../knexfile';
import path from 'path';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = config[environment];

const db = knex(knexConfig);

export default db;