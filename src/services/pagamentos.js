import { z } from "zod";
import { prisma } from "../prismaClient.js";

export class PagamentoService {
  async comprarIngresso({ nome, data, horario, fileira, assento }) {
    try {
      // Validação básica dos dados de entrada
      const ingressoSchema = z.object({
        nome: z.string().min(1, "Nome da peça é obrigatório."),
        data: z.string().min(1, "Data é obrigatória."),
        horario: z.string().min(1, "Horário é obrigatório."),
        fileira: z.string().min(1, "Fileira é obrigatória."),
        assento: z.number().min(1, "Número do assento é obrigatório."),
      });

      ingressoSchema.parse({ nome, data, horario, fileira, assento });

      // Buscar a sessão com base no nome, data e horário
      const sessao = await prisma.session.findFirst({
        where: {
          nome,
          date: new Date(data), // Converter string de data para o formato Date
          time: new Date(`${data}T${horario}`), // Formatar o horário corretamente
        },
        include: {
          seats: true, // Incluir os assentos relacionados
        },
      });

      if (!sessao) {
        throw new Error("Sessão não encontrada.");
      }

      // Formatar o número do assento com base na fileira e número (ex: A1, B12)
      const positionNumber = `${fileira}${assento}`;

      // Verificar se o assento está disponível
      const assentoDisponivel = await prisma.seat.findFirst({
        where: {
          positionNumber,
          sessionId: sessao.id, // Usar sessionId ao invés de sessaoId
          status: 'LIVRE', // Apenas assentos livres
        },
      });

      if (!assentoDisponivel) {
        throw new Error(`O assento ${positionNumber} não está disponível.`);
      }

      // Simulação de pagamento (aqui pode integrar com um gateway real)
      const pagamentoBemSucedido = true; // Aqui você pode integrar com um serviço real
      if (!pagamentoBemSucedido) {
        throw new Error("Falha no pagamento.");
      }

      // Marcar o assento como ocupado após pagamento bem-sucedido
      await this.marcarAssentosComoOcupados([assentoDisponivel.id]);

      // Registrar o pagamento no banco de dados
      await this.registrarPagamentos([assentoDisponivel.id]);

      return { sucesso: true, mensagem: "Pagamento realizado com sucesso.", assento: positionNumber };
    } catch (error) {
      console.error("Erro ao comprar ingresso:", error);
      throw error; // Re-lançar o erro para o tratamento externo
    }
  }

  async marcarAssentosComoOcupados(assentosIds) {
    try {
      // Atualiza o status dos assentos para "OCUPADO"
      const assentosOcupados = await prisma.seat.updateMany({
        where: {
          id: { in: assentosIds },
          status: 'LIVRE', // Apenas assentos livres podem ser marcados como ocupados
        },
        data: {
          status: 'OCUPADO',
        },
      });

      if (assentosOcupados.count === 0) {
        throw new Error("Nenhum assento disponível para ser marcado como ocupado.");
      }

      return assentosOcupados;
    } catch (error) {
      console.error("Erro ao marcar assentos como ocupados:", error);
      throw error;
    }
  }

  async registrarPagamentos(assentosIds) {
    try {
      const pagamentos = assentosIds.map((assentoId) => ({
        seatId: assentoId, // Relacionar o pagamento ao assento
      }));

      // Criar os registros de pagamento no banco de dados
      await prisma.pagamento.createMany({
        data: pagamentos,
      });
    } catch (error) {
      console.error("Erro ao registrar pagamentos:", error);
      throw error;
    }
  }
}
