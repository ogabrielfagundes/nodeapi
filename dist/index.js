"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
// Importar variáveis de ambientes
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Criar a Aplicação Express
const app = (0, express_1.default)();
//Criar um middleware para receber os dados no corpo da requisição
app.use(express_1.default.json());
//Incluir as Controllers
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const SituationsController_1 = __importDefault(require("./controllers/SituationsController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const ProductSituationController_1 = __importDefault(require("./controllers/ProductSituationController"));
const CategoriesController_1 = __importDefault(require("./controllers/CategoriesController"));
//Criar as rotas
app.use('/', AuthController_1.default);
app.use('/', SituationsController_1.default);
app.use('/', UsersController_1.default);
app.use('/', ProductSituationController_1.default);
app.use('/', CategoriesController_1.default);
app.use('/', ProductSituationController_1.default);
//Iniciar o servidor na porta 8080
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
