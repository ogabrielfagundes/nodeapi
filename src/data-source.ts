import "reflect-metadata";
import { DataSource } from "typeorm";
import { situations } from "./entity/situations";
import { users } from "./entity/users";
import { product_situations } from "./entity/product_situations";
import { categories } from "./entity/categories";
import { products } from "./entity/products";

// Importar variáveis de ambientes
import dotenv from "dotenv";

// Carregar as variaveis do .env
dotenv.config()

const dialect = process.env.DB_DIALECT ?? "mysql";

export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [situations, users, product_situations, categories, products],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});

//Inicializar a conexão com BD
AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizado com sucesso!")
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados!", error)
})