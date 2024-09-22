import { z } from "zod";
import { prisma } from "../prismaClient.js";

export class PagamentoService {
    // Simulação de pagamento
    async processarPagamento({ assentosIds, total }) {
      try {
        // Simulação de uma lógica de pagamento bem-sucedido
        const pagamentoBemSucedido = true; // Aqui você integraria com um gateway real
  
        if (!pagamentoBemSucedido) {
          throw new Error('Falha no pagamento.');
        }
  
        // Após o pagamento bem-sucedido, marcar os assentos como ocupados
        await this.marcarAssentosComoOcupados(assentosIds);

        // Registrar o pagamento no banco de dados
        await this.registrarPagamentos(assentosIds);
  
        return { sucesso: true, mensagem: 'Pagamento realizado com sucesso.' };
      } catch (error) {
        throw error;
      }
    }
  
    // Função para marcar assentos como ocupados
    async marcarAssentosComoOcupados(assentosIds) {
        try {
          // Atualiza todos os assentos que estão livres para "OCUPADO" com base nos IDs
          const assentosOcupados = await prisma.assento.updateMany({
            where: {
              id: {
                in: assentosIds, // Lista de IDs de assentos a serem marcados
              },
              status: 'LIVRE', // Apenas assentos livres devem ser atualizados
            },
            data: {
              status: 'OCUPADO', // Marca como "OCUPADO"
            },
          });
    
          if (assentosOcupados.count === 0) {
            throw new Error('Nenhum assento disponível para ser marcado como ocupado.');
          }
    
          return assentosOcupados;
        } catch (error) {
          throw error;
        }
    }

    // Função para registrar pagamentos
    async registrarPagamentos(assentosIds) {
        try {
        const pagamentos = assentosIds.map((assentoId) => ({
            assentoId, // Relaciona o pagamento com o assento
        }));

        // Criar registros de pagamento no banco de dados
        await prisma.pagamento.createMany({
            data: pagamentos,
        });
        } catch (error) {
        throw error;
        }
    }
}    
