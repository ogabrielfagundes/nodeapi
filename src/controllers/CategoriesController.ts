//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { categories } from "../entity/categories";
import { PaginationService } from "../services/PaginationService";

//Criar a Aplicação Express
const router = express.Router()

//Criar a LISTA principal
router.get("/categories", async (req: Request, res: Response) => {
    try {
        const categoryRepository = AppDataSource.getRepository(categories);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(categoryRepository, page, limit, { id: "DESC" });

        res.status(200).json();
        return;

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar categorias!",
        });
        return
    }
});

//Criar a vizualização do item cadastrado em categorias
router.get("/categories/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoryRepository = AppDataSource.getRepository(categories);
        const category = await categoryRepository.findOneBy({ id: parseInt(id) });

        if (!category) {
            res.status(404).json({
                messagem: "Categorias não encontrada!",
            });
            return
        }

        res.status(200).json(category)
        return
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao visualizar categorias!",
        });
        return
    }
});

//Criar a edição PUT
router.put("/categories/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const categoryRepository = AppDataSource.getRepository(categories);
        const category = await categoryRepository.findOneBy({ id: parseInt(id) });

        if (!category) {
            res.status(404).json({
                messagem: "Categorias não encontrada!",
            });
            return
        }

        // Atualiza os dados
        categoryRepository.merge(category, data);

        //Salvar as alterações de dados
        const updateCategory = await categoryRepository.save(category)

        res.status(201).json({
            messagem: "Categoria atualizada com sucesso!",
            situation: updateCategory,
        });
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao editar categoria!",
        });
        return
    }
});

//Criar a rota POST
router.post("/categories", async (req: Request, res: Response) => {
    try {

        var data = req.body;
        const situationRepository = AppDataSource.getRepository(categories);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Categoria do produto cadastrada com sucesso!",
            situation: newSituation,
        });

    } catch (error) {

        res.status(500).json({
            messagem: "Erro ao cadastrar categoria do produto!",
        })

    }
});

//Criar a remoção DELETE
router.delete("/categories/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoryRepository = AppDataSource.getRepository(categories);
        const category = await categoryRepository.findOneBy({ id: parseInt(id) });

        if (!category) {
            res.status(404).json({
                messagem: "Categorias não encontrada!",
            });
            return
        }

        // Atualiza os dados
        categoryRepository.remove(category);


        res.status(201).json({
            messagem: "Categoria removida com sucesso!",
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover categoria!",
        });
        return
    }
});

//Exportar a instrução da rota
export default router