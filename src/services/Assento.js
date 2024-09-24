import { prisma } from '../prismaClient.js';

const getAssentos = async () => {
  return await prisma.assento.findMany();
};

const updateAssentoStatus = async (id, status) => {
  return await prisma.assento.update({
    where: { id },
    data: { status },
  });
};

export const assentoService = { getAssentos, updateAssentoStatus };
