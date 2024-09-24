import express from 'express';
import sessaoController from '../controllers/Sessao.js';

const router = express.Router();

// Rotas para sessões
router.get('/', sessaoController.getAllSessoes); // Obter todas as sessões
router.post('/', sessaoController.createSessao); // Criar uma nova sessão
router.get('/:id', sessaoController.getSessaoById); // Obter uma sessão por ID

export default router; // Exportando o router
