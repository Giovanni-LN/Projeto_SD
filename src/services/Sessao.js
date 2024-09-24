import { prisma } from '../prismaClient.js';
import { AppError } from '../utils/AppError.js';

const getSessoes = async () => {
  return await prisma.sessao.findMany(); // Obtendo todas as sessões
};

const createSessao = async (data) => {
  return await prisma.sessao.create({ data }); // Criando uma nova sessão
};

const getSessaoById = async (id) => {
  const sessao = await prisma.sessao.findUnique({ where: { id } });
  if (!sessao) {
    throw new AppError("Sessão não encontrada", 404); // Lançando um erro se a sessão não for encontrada
  }
  return sessao; // Retornando a sessão se encontrada
};

export const sessaoService = { createSessao, getSessaoById, getSessoes };
