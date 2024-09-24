import express from 'express';
import sessaoController from '../controllers/Sessao.js';

const router = express.Router();

// Rotas para sessões
router.get('/search', sessaoController.getAllSessoesByPlayItem); // Obter sessões por PlayItem
router.post('/', sessaoController.createSessao); // Criar uma nova sessão
router.delete('/', sessaoController.deleteSessao); // Deletar uma sessão

export default router; // Exportando o router
