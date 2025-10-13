//Importar a biblioteca Express
import express from "express";

// Importar variáveis de ambientes
import dotenv from "dotenv";
dotenv.config()


//Criar a Aplicação Express
const app = express()


//Criar um middleware para receber os dados no corpo da requisição
app.use(express.json());

//Incluir as Controllers
import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import UsersController from "./controllers/UsersController";
import ProductSituation from "./controllers/ProductSituationController";
import CategoriesController from "./controllers/CategoriesController";
import ProductsController from "./controllers/ProductsController";

//Criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)
app.use('/', UsersController)
app.use('/', ProductSituation)
app.use('/', CategoriesController)
app.use('/', ProductSituation)

//Iniciar o servidor na porta 8080
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
});