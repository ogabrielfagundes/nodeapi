//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { situations } from "../entity/situations";
import { PaginationService } from "../services/PaginationService";

//Criar a Aplicação Express
const router = express.Router()

//Criar a LISTA principal
router.get("/situations", async (req: Request, res: Response) => {
    try {
        //Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(situations);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // Definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(situationRepository, page, limit, { id: "DESC" });

        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json();
        return;
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar situação!",
        });
        return
    }
});

//Criar a vizualização do item cadastrado em situação
router.get("/situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const situationRepository = AppDataSource.getRepository(situations);
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return
        }

        res.status(200).json(situation)
        return
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao vizualizar situação!",
        });
        return
    }
});

// Criar a edição PUT
router.put("/situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = AppDataSource.getRepository(situations);
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return
        }

        // Atualiza os dados
        situationRepository.merge(situation, data);

        //Salvar as alterações de dados
        const updateSituation = await situationRepository.save(situation)

        res.status(201).json({
            messagem: "Situação atualizada com sucesso!",
            situation: updateSituation,
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar situação!",
        });
        return
    }
});

//Criar a rota POST
router.post("/situations", async (req: Request, res: Response) => {
    try {

        var data = req.body;
        const situationRepository = AppDataSource.getRepository(situations);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });

    } catch (error) {

        res.status(500).json({
            messagem: "Erro ao cadastrar situação!",
        })

    }
});

// Criar o excluir DELETE
router.delete("/situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const situationRepository = AppDataSource.getRepository(situations);
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return
        }

        // Remove os dados direto no banco de dados
        await situationRepository.remove(situation);

        res.status(201).json({
            messagem: "Situação removida com sucesso!",
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover situação!",
        });
        return
    }
});

//Exportar a instrução da rota
export default router