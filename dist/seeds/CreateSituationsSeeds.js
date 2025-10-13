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
Object.defineProperty(exports, "__esModule", { value: true });
const situations_1 = require("../entity/situations");
class CreateSituationsSeeds {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciando o seed para a tabela 'situations'...");
            const situationRepository = dataSource.getRepository(situations_1.situations);
            const existingCount = yield situationRepository.count();
            if (existingCount > 0) {
                console.log("A tabela 'situations' já possui dados. Nenhuma alteração foi realizada!");
                return;
            }
            const situation = [
                { nameSituation: "Ativo" },
                { nameSituation: "Inativo" },
                { nameSituation: "Pedente" },
            ];
            yield situationRepository.save(situation);
            console.log("Seed concluído com sucesso: situações cadastradas!");
        });
    }
}
exports.default = CreateSituationsSeeds;
