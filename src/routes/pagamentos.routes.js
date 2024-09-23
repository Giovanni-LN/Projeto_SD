import express from "express";
import { PagamentoController } from "../controllers/PagamentoController.js"; // Importa o controller

const pagamentosRoutes = express.Router(); // Define as rotas de pagamentos
const pagamentoController = new PagamentoController(); // Inicializa o controller

// Define a rota para processar o pagamento
pagamentosRoutes.post("/pagamento", (req, res) => pagamentoController.processarPagamento(req, res));

export { pagamentosRoutes };
