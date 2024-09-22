import { z } from "zod";
import { prisma } from "../prismaClient.js"; // Importa o Prisma Client Singleton

// Schema de validação para os dados de Assento usando Zod
const assentoSchema = z.object({
  positionNumber: z.number().int("positionNumber deve ser um número inteiro."),
  price: z.number("price deve ser um número flutuante."),
});

const sessaoSchema = z.object({
  nome: z.string().min(1, "O título do filme é obrigatório."),
  sessaoId: z.number().int("sessaoId deve ser um número inteiro."),
  horario: z.string().min(1, "O horário da sessão é obrigatório."),
});

export class SessaoService {
  async createSessao({ nome, sessaoId, horario, assentos }) {
    try {
      // Validação dos dados da sessão
      sessaoSchema.parse({ nome, sessaoId, horario });

      // Criação da sessão no banco de dados
      const sessao = await prisma.sessao.create({
        data: {
          nome,
          sessaoId,
          horario,
        },
      });

      // Criar os assentos para a sessão
      const assentoService = new AssentoService();
      await assentoService.createAssentosParaSessao({
        sessaoId: sessao.id, // Relaciona os assentos à sessão
        assentos,
      });

      return sessao;
    } catch (error) {
      throw error;
    }
  }
}

export class AssentoService {  
  async createAssentosParaSessao({ sessaoId }) {
    const quantidadeAssentos = 72;

    try {
      // Cria um array de assentos com números de posição
      const assentos = Array.from({ length: quantidadeAssentos }, (_, index) => ({
        positionNumber: index + 1, // Assume que os assentos começam em 1
        price: 10, // Preço padrão
        sessaoId, // Relaciona cada assento à sessão
        status: 'LIVRE', // Define o status inicial como livre
      }));
  
      // Cria os assentos no banco de dados
      const assentosCriados = await prisma.assento.createMany({
        data: assentos,
      });
  
      return assentosCriados;
    } catch (error) {
      throw error;
    }
  }

  async verificarDisponibilidadeAssento({ positionNumber, sessaoId }) {
    try {
      const assento = await prisma.assento.findFirst({
        where: {
          positionNumber,
          sessaoId,
        },
      });
  
      if (assento && assento.status === 'LIVRE') {
        return assento;
      } else {
        throw new Error('Assento indisponível.');
      }
    } catch (error) {
      throw error;
    }
  }

  async findByPositionNumber({ positionNumber }) {
    // Valida a entrada positionNumber
    try {
      z.number()
        .int("positionNumber deve ser um número inteiro.")
        .parse(positionNumber);

      // Busca o assento no banco de dados
      const assento = await prisma.assento.findFirst({
        where: {
          positionNumber,
        },
      });

      return assento;
    } catch (error) {
      // Retorna o erro de validação se houver
      throw error;
    }
  }

  async listAll() {
    // Lista todos os assentos sem validação, já que não há entradas
    const assento = await prisma.assento.findMany({});
    return assento;
  }
}