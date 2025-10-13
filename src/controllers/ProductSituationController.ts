//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { product_situations } from "../entity/product_situations";
import { PaginationService } from "../services/PaginationService";

//Criar a Aplicação Express
const router = express.Router()

//Criar a LISTA principal
router.get("/product_situations", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(product_situations);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationService.paginate(productRepository, page, limit, { id: "DESC" });

        res.status(200).json();
        return;

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao listar situações de produtos!",
        });
        return
    }
});

//Criar a vizualização do item cadastrado em categorias
router.get("/product_situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(product_situations);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Situações de produtos não encontrada!",
            });
            return
        }

        res.status(200).json(product)
        return
    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao visualizar situações de produtos!",
        });
        return
    }
});

//Criar a edição PUT
router.put("/product_situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = AppDataSource.getRepository(product_situations);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Situação de produtos não encontrada!",
            });
            return
        }

        // Atualiza os dados
        productRepository.merge(product, data);

        //Salvar as alterações de dados
        const updateProduct = await productRepository.save(product)

        res.status(201).json({
            messagem: "Situação de produto atualizado com sucesso!",
            situation: updateProduct,
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar situação de produto!",
        });
        return
    }
});


//Criar a rota POST
router.post("/product_situation", async (req: Request, res: Response) => {
    try {

        var data = req.body;
        const situationRepository = AppDataSource.getRepository(product_situations);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Situação do produto cadastrada com sucesso!",
            situation: newSituation,
        });

    } catch (error) {

        res.status(500).json({
            messagem: "Erro ao cadastrar situação do produto!",
        })

    }
});

//Criar a remoção DELETE
router.delete("/product_situations/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(product_situations);
        const product = await productRepository.findOneBy({ id: parseInt(id) });

        if (!product) {
            res.status(404).json({
                messagem: "Situação de produtos não encontrada!",
            });
            return
        }

        // Atualiza os dados
        productRepository.remove(product);


        res.status(201).json({
            messagem: "Situação de produto removida com sucesso!"
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover situação de produto!",
        });
        return
    }
});

//Exportar a instrução da rota
export default router