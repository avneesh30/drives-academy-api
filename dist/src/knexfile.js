"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
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
exports.default = config;
//# sourceMappingURL=knexfile.js.map