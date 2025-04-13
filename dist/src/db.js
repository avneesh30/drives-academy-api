"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var knex_1 = __importDefault(require("knex"));
var connection = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: 'https://coredevstudio.com',
        port: 5432,
        user: 'coreczbf_avneesh10',
        password: 'hM~2f&vg2!o-',
        database: 'coreczbf_drives-academy',
    }
});
exports.connection = connection;
//# sourceMappingURL=db.js.map