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
const categories_1 = require("../entity/categories");
const PaginationService_1 = require("../services/PaginationService");
//Criar a Aplicação Express
const router = express_1.default.Router();
//Criar a LISTA principal
router.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryRepository = data_source_1.AppDataSource.getRepository(categories_1.categories);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(categoryRepository, page, limit, { id: "DESC" });
        res.status(200).json();
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar categorias!",
        });
        return;
    }
}));
//Criar a vizualização do item cadastrado em categorias
router.get("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoryRepository = data_source_1.AppDataSource.getRepository(categories_1.categories);
        const category = yield categoryRepository.findOneBy({ id: parseInt(id) });
        if (!category) {
            res.status(404).json({
                messagem: "Categorias não encontrada!",
            });
            return;
        }
        res.status(200).json(category);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao visualizar categorias!",
        });
        return;
    }
}));
//Criar a edição PUT
router.put("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const categoryRepository = data_source_1.AppDataSource.getRepository(categories_1.categories);
        const category = yield categoryRepository.findOneBy({ id: parseInt(id) });
        if (!category) {
            res.status(404).json({
                messagem: "Categorias não encontrada!",
            });
            return;
        }
        // Atualiza os dados
        categoryRepository.merge(category, data);
        //Salvar as alterações de dados
        const updateCategory = yield categoryRepository.save(category);
        res.status(201).json({
            messagem: "Categoria atualizada com sucesso!",
            situation: updateCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao editar categoria!",
        });
        return;
    }
}));
//Criar a rota POST
router.post("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(categories_1.categories);
        const newSituation = situationRepository.create(data);
        yield situationRepository.save(newSituation);
        res.status(201).json({
            messagem: "Categoria do produto cadastrada com sucesso!",
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao cadastrar categoria do produto!",
        });
    }
}));
//Criar a remoção DELETE
router.delete("/categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoryRepository = data_source_1.AppDataSource.getRepository(categories_1.categories);
        const category = yield categoryRepository.findOneBy({ id: parseInt(id) });
        if (!category) {
            res.status(404).json({
                messagem: "Categorias não encontrada!",
            });
            return;
        }
        // Atualiza os dados
        categoryRepository.remove(category);
        res.status(201).json({
            messagem: "Categoria removida com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover categoria!",
        });
        return;
    }
}));
//Exportar a instrução da rota
exports.default = router;
