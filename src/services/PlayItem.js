import { prisma } from '../prismaClient.js';
import { AppError } from '../utils/AppError.js';

const getPlayItems = async () => {
  return await prisma.playItem.findMany();
};

const createPlayItem = async (data) => {
  return await prisma.playItem.create({ data });
};

const getPlayItemById = async (id) => {
  const playItem = await prisma.playItem.findUnique({ where: { id: parseInt(id) } }); // Certifique-se de que o ID seja um número
  if (!playItem) {
    throw new AppError("Play item not found", 404);
  }
  return playItem;
};

const deletePlayItem = async (id) => {
  const deletedPlayItem = await prisma.playItem.delete({
    where: { id: parseInt(id) },
  });
  return deletedPlayItem;
};


export const playItemService = { createPlayItem, getPlayItemById, getPlayItems, deletePlayItem };
