import { DataSource } from "typeorm";
import { product_situations } from "../entity/product_situations";

export default class CreateProductSituationSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'product_situations'...")

        const situationRepository = dataSource.getRepository(product_situations);

        const existingCount = await situationRepository.count()

        if (existingCount > 0) {
            console.log("A tabela 'product_situations' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const productSituation = [
            { name: "Vendido" },
            { name: "Esgotado" },
            { name: "Aguardando pagamento" },
        ]

        await situationRepository.save(productSituation);

        console.log("Seed concluído com sucesso: situações cadastradas!");

    }

}