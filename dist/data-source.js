"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const situations_1 = require("./entity/situations");
const users_1 = require("./entity/users");
const product_situations_1 = require("./entity/product_situations");
const categories_1 = require("./entity/categories");
const products_1 = require("./entity/products");
// Importar variáveis de ambientes
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar as variaveis do .env
dotenv_1.default.config();
const dialect = (_a = process.env.DB_DIALECT) !== null && _a !== void 0 ? _a : "mysql";
exports.AppDataSource = new typeorm_1.DataSource({
    type: dialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [situations_1.situations, users_1.users, product_situations_1.product_situations, categories_1.categories, products_1.products],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});
//Inicializar a conexão com BD
exports.AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizado com sucesso!");
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados!", error);
});
