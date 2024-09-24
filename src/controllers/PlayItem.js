import { playItemService } from '../services/PlayItem.js';
import { AppError } from '../utils/AppError.js';

const getAllPlayItems = async (req, res, next) => { // Ajustado para receber 'req'
  try {
    const playItems = await playItemService.getPlayItems();
    res.json(playItems);
  } catch (error) {
    next(new AppError("Error fetching play items", 500));
  }
};

const createPlayItem = async (req, res, next) => { // Mantido 'req' para acesso ao corpo
  const { nome, imageUrl } = req.body;
  try {
    const newPlayItem = await playItemService.createPlayItem({ nome, imageUrl });
    res.status(201).json(newPlayItem);
  } catch (error) {
    next(new AppError("Error creating play item", 500));
  }
};

const getPlayItemById = async (req, res, next) => {
  const { id } = req.params; // Mantido para obter o ID
  try {
    const playItem = await playItemService.getPlayItemById(id);
    res.json(playItem);
  } catch (error) {
    next(new AppError("Play item not found", 404));
  }
};

const deletePlayItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await playItemService.deletePlayItem(id);
    res.status(204).send();
  } catch (error) {
    next(new AppError("Play item not found", 404));
  }
};

export default { createPlayItem, getAllPlayItems, getPlayItemById, deletePlayItem };
