//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { products } from "../entity/products";
import { PaginationService } from "../services/PaginationService";

//Criar a Aplicação Express
const router = express.Router()

//Criar a LISTA principal
router.get("/products", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(products);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(productRepository, page, limit, { id: "DESC" });

        res.status(200).json();
        return;

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar produtos!",
        });
        return
    }
});

//Criar a vizualização do item cadastrado em categorias
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(products);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Produtos não encontrada!",
            });
            return
        }

        res.status(200).json(product)
        return
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao visualizar produtos!",
        });
        return
    }
});

//Criar a edição PUT
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = AppDataSource.getRepository(products);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Produtos não encontrada!",
            });
            return
        }

        // Atualiza os dados
        productRepository.merge(product, data);

        //Salvar as alterações de dados
        const updateProduct = await productRepository.save(product)

        res.status(201).json({
            messagem: "Produto atualizado com sucesso!",
            situation: updateProduct,
        });
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar produto!",
        });
        return
    }
});

//Criar a rota POST
router.post("/products", async (req: Request, res: Response) => {
    try {

        var data = req.body;
        const situationRepository = AppDataSource.getRepository(products);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Produto cadastrado com sucesso!",
            situation: newSituation,
        });

    } catch (error) {

        res.status(500).json({
            messagem: "Erro ao cadastrar o produto!",
        })

    }
});

//Criar a remoção DELETE
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(products);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Produtos não encontrada!",
            });
            return
        }

        // Atualiza os dados
        productRepository.remove(product);



        res.status(201).json({
            messagem: "Produto removido com sucesso!",
        });
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover produto!",
        });
        return
    }
});

//Exportar a instrução da rota
export default router