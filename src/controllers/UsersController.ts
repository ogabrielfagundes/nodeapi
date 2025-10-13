//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { users } from "../entity/users";
import { PaginationService } from "../services/PaginationService";

//Criar a Aplicação Express
const router = express.Router()

//Criar a LISTA principal
router.get("/users", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(users);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(productRepository, page, limit, { id: "DESC" });

        res.status(200).json();
        return;


    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuários!",
        });
        return
    }
});

//Criar a vizualização do item cadastrado em categorias
router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(users);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Usuário não encontrada!",
            });
            return
        }

        res.status(200).json(product)
        return
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuários!",
        });
        return
    }
});

//Criar a edição PUT
router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = AppDataSource.getRepository(users);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Usuário não encontrada!",
            });
            return
        }

        // Atualiza os dados
        productRepository.merge(product, data);

        //Salvar as alterações de dados
        const updateProduct = await productRepository.save(product)

        res.status(201).json({
            messagem: "Usuário atualizado com sucesso!",
            situation: updateProduct,
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuário!",
        });
        return
    }
});

//Criar a rota POST
router.post("/users", async (req: Request, res: Response) => {
    try {

        var data = req.body;
        const situationRepository = AppDataSource.getRepository(users);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Usuário cadastrado com sucesso!",
            situation: newSituation,
        });

    } catch (error) {

        res.status(500).json({
            messagem: "Erro ao cadastrar usuário!",
        })

    }
});

//Criar a remoção DELETE
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = AppDataSource.getRepository(users);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Usuário não encontrada!",
            });
            return
        }

        // Atualiza os dados
        productRepository.remove(product, data);


        res.status(201).json({
            messagem: "Usuário removido com sucesso!",
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar usuário!",
        });
        return
    }
});

//Exportar a instrução da rota
export default router