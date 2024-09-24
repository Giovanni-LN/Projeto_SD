import express from 'express';
import assentoController from '../controllers/Assento.js'; // Ajuste o caminho se necessário

const router = express.Router();

// Rotas para assentos
router.get('/:sessaoId', assentoController.getAssentosBySessao); // Obter assentos de uma sessão específica
router.put('/atualizar', assentoController.updateAssentos); // Atualizar o status de múltiplos assentos


export default router; // Exporta o router
