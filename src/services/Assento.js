import { prisma } from '../prismaClient.js';

const getAssentosBySessao = async (sessaoId) => {
  return await prisma.assento.findMany({
    where: { sessaoId },
  });
};

const updateAssentosStatus = async (ids, status) => {
  const updates = ids.map(id => prisma.assento.update({
    where: { id },
    data: { status },
  }));
  return await Promise.all(updates);
};

export const assentoService = { getAssentosBySessao, updateAssentosStatus };
