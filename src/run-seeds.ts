import { AppDataSource } from "./data-source";
import CreateProductSituationSeeds from "./seeds/CreateProductSituationSeeds";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";

const runSeeds = async () => {
    console.log("Conectando ao banco de dados...")

    await AppDataSource.initialize();

    console.log("Banco de dados conectado!")

    try {

        // Criar a instancia da classes de seed
        const situationSeeds = new CreateSituationsSeeds();
        const productSituationSeeds = new CreateProductSituationSeeds();

        // Executa as Seeds
        await situationSeeds.run(AppDataSource)
        await productSituationSeeds.run(AppDataSource)

    } catch (error) {
        console.log("Erro ao executar o seed", error);
    } finally {

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.")
    }
};

runSeeds();