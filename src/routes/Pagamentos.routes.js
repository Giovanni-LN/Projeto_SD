import express from 'express';
import PagamentoController from '../controllers/Pagamentos.js'; // Importação correta

const router = express.Router();
const pagamentoController = new PagamentoController(); // Cria uma instância do controlador

// Rota para processar o pagamento
router.post('/', (req, res, next) => pagamentoController.processarPagamento(req, res, next));

export default router; // Exporta o router
