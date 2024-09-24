import { prisma } from '../prismaClient.js';
import { AppError } from '../utils/AppError.js';

const getSessoesByPlayItemId = async (playItemId) => {
  return await prisma.sessao.findMany({
    where: { playItemId },
    include: { assentos: true },
  });
};

const createSessao = async (data) => {
  const { playItemId, data: sessaoData, horario } = data;

  const seatConfig = {
    A: 12,
    B: 12,
    C: 12,
    D: 12,
    E: 10,
    F: 8,
    G: 6,
  };

  return await prisma.sessao.create({
    data: {
      data: sessaoData,
      horario,
      playItem: { connect: { id: playItemId } },
      assentos: {
        create: Object.entries(seatConfig).flatMap(([row, seats]) =>
          Array.from({ length: seats }, (_, i) => ({
            positionNumber: `${row}${i + 1}`,
            status: 'LIVRE',
          }))
        ),
      },
    },
    include: {
      assentos: true,
    },
  });
};

const deleteSessaoByDataHora = async (playItemId, data, horario) => {
  const sessao = await prisma.sessao.findFirst({
    where: {
      playItemId,
      data: new Date(data),
      horario,
    },
  });

  if (!sessao) {
    throw new AppError("Sessão não encontrada com a data, horário e PlayItem especificados", 404);
  }

  await prisma.sessao.delete({
    where: { id: sessao.id },
  });

  return sessao;
};

export const sessaoService = { getSessoesByPlayItemId, createSessao, deleteSessaoByDataHora };
