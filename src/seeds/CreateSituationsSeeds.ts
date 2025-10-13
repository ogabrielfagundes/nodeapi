import { DataSource } from "typeorm";
import { situations } from "../entity/situations";

export default class CreateSituationsSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'situations'...")

        const situationRepository = dataSource.getRepository(situations);

        const existingCount = await situationRepository.count()

        if (existingCount > 0) {
            console.log("A tabela 'situations' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const situation = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pedente" },
        ]

        await situationRepository.save(situation);

        console.log("Seed concluído com sucesso: situações cadastradas!");

    }

}