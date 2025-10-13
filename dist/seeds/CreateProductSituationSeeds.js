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
const product_situations_1 = require("../entity/product_situations");
class CreateProductSituationSeeds {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciando o seed para a tabela 'product_situations'...");
            const situationRepository = dataSource.getRepository(product_situations_1.product_situations);
            const existingCount = yield situationRepository.count();
            if (existingCount > 0) {
                console.log("A tabela 'product_situations' já possui dados. Nenhuma alteração foi realizada!");
                return;
            }
            const productSituation = [
                { name: "Vendido" },
                { name: "Esgotado" },
                { name: "Aguardando pagamento" },
            ];
            yield situationRepository.save(productSituation);
            console.log("Seed concluído com sucesso: situações cadastradas!");
        });
    }
}
exports.default = CreateProductSituationSeeds;
