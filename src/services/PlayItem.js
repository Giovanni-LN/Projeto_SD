import { prisma } from '../prismaClient.js';
import { AppError } from '../utils/AppError.js';

const getPlayItems = async () => {
  return await prisma.playItem.findMany({
    include: {
      sessoes: true,
    },
  });
};

const createPlayItem = async (data) => {
  return await prisma.playItem.create({ data });
};

const getPlayItemByNome = async (nome) => {
  const playItem = await prisma.playItem.findUnique({
    where: { nome },
    include: {
      sessoes: true,
    },
  });

  if (!playItem) {
    throw new AppError("PlayItem not found", 404);
  }

  return playItem;
};

const deletePlayItem = async (id) => {
  const deletedPlayItem = await prisma.playItem.delete({
    where: { id: parseInt(id) },
  });
  return deletedPlayItem;
};


export const playItemService = { createPlayItem, getPlayItemByNome, getPlayItems, deletePlayItem };
