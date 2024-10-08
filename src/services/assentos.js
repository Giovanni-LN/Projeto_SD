import { z } from "zod";
import { prisma } from "../prismaClient.js"; // Importa o Prisma Client Singleton

// Schema de validação para os dados de Assento usando Zod
const assentoSchema = z.object({
  positionNumber: z.string("positionNumber deve ser uma string."), // Deve ser uma string, não um número
  price: z.number("price deve ser um número flutuante."),
});

const sessaoSchema = z.object({
  nome: z.string().min(1, "O título do filme é obrigatório."),
  data: z.string().min(1, "A data da sessão é obrigatória."),
  horario: z.string().min(1, "O horário da sessão é obrigatório."),
});

export class SessaoService {
  async createSessao({ nome, data, horario, assentos }) {
    try {
      // Validação dos dados da sessão
      sessaoSchema.parse({ nome, data, horario });
  
      // Formatar a data e hora corretamente
      const dataHora = new Date(`${data}T${horario}`);
  
      // Criação da sessão no banco de dados
      const sessao = await prisma.sessao.create({
        data: {
          nome,
          data: dataHora, // Usando o objeto Date
          horario,
        },
      });
  
      // Criar os assentos para a sessão
      const assentoService = new AssentoService();
      await assentoService.createAssentosParaSessao({
        sessaoId: sessao.id, // Relaciona os assentos à sessão
        assentos // Passa os assentos aqui
      });
  
      return sessao;
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
      throw error;
    }
  }

  async listarAssentosPorDiaHora({ data, horario }) {
    try {
      // Busca a sessão com base no dia e no horário
      const sessao = await prisma.sessao.findFirst({
        where: {
          data: new Date(data), // Converte a string 'data' para o formato Date
          horario: horario,
        },
        include: {
          assentos: true, // Inclui os assentos relacionados à sessão
        },
      });

      if (!sessao) {
        throw new Error('Nenhuma sessão encontrada para a data e hora fornecidas.');
      }

      // Organiza os assentos por fila
      const assentosPorFila = sessao.assentos.reduce((acc, assento) => {
        const fila = assento.positionNumber[0]; // A primeira letra indica a fila (ex: 'A', 'B', 'C')
        if (!acc[fila]) {
          acc[fila] = [];
        }
        acc[fila].push(assento);
        return acc;
      }, {});

      // Retorna as filas organizadas com os assentos
      return assentosPorFila;
    } catch (error) {
      console.error("Erro ao listar assentos:", error);
      throw error;
    }
  }

  async getDatasEHorasPorNome({ nome }) {
    try {
      // Busca todas as sessões com o nome da peça especificado
      const sessoes = await prisma.sessao.findMany({
        where: {
          nome: nome,
        },
        select: {
          data: true,
          horario: true,
        },
        orderBy: {
          data: 'asc', // Ordena por data
        }
      });

      if (sessoes.length === 0) {
        throw new Error('Nenhuma sessão encontrada para o nome fornecido.');
      }

      // Organiza as sessões por data
      const datasEHoras = sessoes.reduce((acc, sessao) => {
        const data = sessao.data.toISOString().split('T')[0]; // Extrai apenas a parte da data (yyyy-mm-dd)
        if (!acc[data]) {
          acc[data] = [];
        }
        acc[data].push(sessao.horario);
        return acc;
      }, {});

      return datasEHoras;
    } catch (error) {
      console.error("Erro ao obter datas e horários:", error);
      throw error;
    }
  }

  async getStatusAssentosPorNomeDataHora({ nome, data, horario }) {
    try {
      // Busca a sessão com base no nome, data e horário
      const sessao = await prisma.sessao.findFirst({
        where: {
          nome: nome,
          data: new Date(data), // Converte a string 'data' para o formato Date
          horario: horario,
        },
        include: {
          assentos: true, // Inclui os assentos relacionados à sessão
        },
      });

      if (!sessao) {
        throw new Error('Nenhuma sessão encontrada para os parâmetros fornecidos.');
      }

      // Organiza os assentos por fila e status
      const statusPorFila = sessao.assentos.reduce((acc, assento) => {
        const fila = assento.positionNumber[0]; // A primeira letra indica a fila (ex: 'A', 'B', 'C')
        if (!acc[fila]) {
          acc[fila] = [];
        }
        acc[fila].push(assento.status); // Armazena o status do assento
        return acc;
      }, {});

      return statusPorFila;
    } catch (error) {
      console.error("Erro ao obter status dos assentos:", error);
      throw error;
    }
  }
}

export class AssentoService {  
  async createAssentosParaSessao({ sessaoId, assentos }) {
    if (!sessaoId) {
      throw new Error("sessaoId is required");
    }

    const assentosParaCriar = assentos.map(assento => ({
      ...assento,
      sessaoId, // Associar o sessaoId corretamente
      status: 'LIVRE',
    }));

    console.log("Criando assentos:", assentosParaCriar); // Log para verificar assentos que serão criados

    return await prisma.assento.createMany({
      data: assentosParaCriar,
    });
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
      console.error("Erro ao verificar disponibilidade do assento:", error);
      throw error;
    }
  }

  async findByPositionNumber({ positionNumber }) {
    // Valida a entrada positionNumber
    try {
      z.string()
        .parse(positionNumber); // Deve ser uma string, não um número

      // Busca o assento no banco de dados
      const assento = await prisma.assento.findFirst({
        where: {
          positionNumber,
        },
      });

      return assento;
    } catch (error) {
      // Retorna o erro de validação se houver
      console.error("Erro ao encontrar assento por positionNumber:", error);
      throw error;
    }
  }

  async listAll() {
    // Lista todos os assentos sem validação, já que não há entradas
    const assento = await prisma.assento.findMany({});
    return assento;
  }
}
