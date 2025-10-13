"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const users_1 = require("../entity/users");
const PaginationService_1 = require("../services/PaginationService");
//Criar a Aplicação Express
const router = express_1.default.Router();
//Criar a LISTA principal
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = data_source_1.AppDataSource.getRepository(users_1.users);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(productRepository, page, limit, { id: "DESC" });
        res.status(200).json();
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuários!",
        });
        return;
    }
}));
//Criar a vizualização do item cadastrado em categorias
router.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(users_1.users);
        const product = yield productRepository.findOneBy({ id: parseInt(id) });
        if (!product) {
            res.status(404).json({
                messagem: "Usuário não encontrada!",
            });
            return;
        }
        res.status(200).json(product);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuários!",
        });
        return;
    }
}));
//Criar a edição PUT
router.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(users_1.users);
        const product = yield productRepository.findOneBy({ id: parseInt(id) });
        if (!product) {
            res.status(404).json({
                messagem: "Usuário não encontrada!",
            });
            return;
        }
        // Atualiza os dados
        productRepository.merge(product, data);
        //Salvar as alterações de dados
        const updateProduct = yield productRepository.save(product);
        res.status(201).json({
            messagem: "Usuário atualizado com sucesso!",
            situation: updateProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuário!",
        });
        return;
    }
}));
//Criar a rota POST
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(users_1.users);
        const newSituation = situationRepository.create(data);
        yield situationRepository.save(newSituation);
        res.status(201).json({
            messagem: "Usuário cadastrado com sucesso!",
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao cadastrar usuário!",
        });
    }
}));
//Criar a remoção DELETE
router.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(users_1.users);
        const product = yield productRepository.findOneBy({ id: parseInt(id) });
        if (!product) {
            res.status(404).json({
                messagem: "Usuário não encontrada!",
            });
            return;
        }
        // Atualiza os dados
        productRepository.remove(product, data);
        res.status(201).json({
            messagem: "Usuário removido com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuário!",
        });
        return;
    }
}));
//Exportar a instrução da rota
exports.default = router;
