import express from 'express';
import assentoController from '../controllers/Assento.js'; // Ajuste o caminho se necessário

const router = express.Router();

// Rotas para assentos
router.get('/', assentoController.getAllAssentos); // Obter todos os assentos
router.put('/:id', assentoController.updateAssento); // Atualizar o status de um assento específico

export default router; // Exporta o router
