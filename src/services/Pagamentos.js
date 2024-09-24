import { prisma } from '../prismaClient.js';

export class PagamentoService {
  async createPagamento(sessaoId, assentosIds) {
    return await prisma.pagamento.create({
      data: {
        sessao: { connect: { id: sessaoId } },
        assentos: { connect: assentosIds.map(id => ({ id })) },
      },
    });
  }
}
