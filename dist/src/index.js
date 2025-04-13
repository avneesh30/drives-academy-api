"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var db_1 = require("./db");
/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a hello message
 *     description: Returns a simple greeting message
 *     responses:
 *       200:
 *         description: Successful response
 *         content: application/json
 */
var app = (0, express_1.default)();
var swaggerDefinition = {
    info: {
        title: 'Hello API',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3001',
        },
    ],
};
var swaggerSpec = (0, swagger_jsdoc_1.default)({
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/index.ts'],
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get('/hello', function (req, res) {
    res.json({ message: 'Hello' });
});
var port = parseInt(process.env.PORT || '3001');
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
db_1.connection.raw('SELECT 1').then(function () {
    console.log('PostgreSQL database connected');
}).catch(function (err) {
    console.error('Error connecting to PostgreSQL database:', err);
});
//# sourceMappingURL=index.js.map