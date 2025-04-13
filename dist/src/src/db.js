"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knexfile_1 = __importDefault(require("../knexfile"));
var environment = process.env.NODE_ENV || 'development';
var knexConfig = knexfile_1.default[environment];
var db = (0, knex_1.default)(knexConfig);
exports.default = db;
//# sourceMappingURL=db.js.map