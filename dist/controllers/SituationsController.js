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
const situations_1 = require("../entity/situations");
const PaginationService_1 = require("../services/PaginationService");
//Criar a Aplicação Express
const router = express_1.default.Router();
//Criar a LISTA principal
router.get("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Obter o repositório da entidade Situation
        const situationRepository = data_source_1.AppDataSource.getRepository(situations_1.situations);
        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
        // Definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(situationRepository, page, limit, { id: "DESC" });
        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json();
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar situação!",
        });
        return;
    }
}));
//Criar a vizualização do item cadastrado em situação
router.get("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(situations_1.situations);
        const situation = yield situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao vizualizar situação!",
        });
        return;
    }
}));
// Criar a edição PUT
router.put("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(situations_1.situations);
        const situation = yield situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        // Atualiza os dados
        situationRepository.merge(situation, data);
        //Salvar as alterações de dados
        const updateSituation = yield situationRepository.save(situation);
        res.status(201).json({
            messagem: "Situação atualizada com sucesso!",
            situation: updateSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar situação!",
        });
        return;
    }
}));
//Criar a rota POST
router.post("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(situations_1.situations);
        const newSituation = situationRepository.create(data);
        yield situationRepository.save(newSituation);
        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao cadastrar situação!",
        });
    }
}));
// Criar o excluir DELETE
router.delete("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(situations_1.situations);
        const situation = yield situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        // Remove os dados direto no banco de dados
        yield situationRepository.remove(situation);
        res.status(201).json({
            messagem: "Situação removida com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover situação!",
        });
        return;
    }
}));
//Exportar a instrução da rota
exports.default = router;
