import express from 'express';
import playItemController from '../controllers/PlayItem.js';

const router = express.Router();

// Rota para obter todos os play items
router.get('/', playItemController.getAllPlayItems);

// Rota para criar um novo play item
router.post('/', playItemController.createPlayItem);

// Rota para obter um play item específico pelo ID
router.get('/:id', playItemController.getPlayItemById);

// Rota para deletar um play item pelo ID
router.delete('/:id', playItemController.deletePlayItem);

export default router;
