import { PagamentoService } from "../services/pagamentos.js"; // Importa o serviço de pagamento

// Controller para lidar com requisições HTTP
export class PagamentoController {
  constructor() {
    this.pagamentoService = new PagamentoService(); // Inicializa o serviço de pagamento
  }

  // Método para processar o pagamento via requisição HTTP
  async processarPagamento(req, res) {
    const { assentosIds, total } = req.body;

    try {
      // Validação dos dados recebidos
      if (!Array.isArray(assentosIds) || assentosIds.length === 0) {
        return res.status(400).json({ error: "É necessário selecionar ao menos um assento." });
      }

      if (total == null || typeof total !== "number") { // Verifica se 'total' não é nulo e é um número
        return res.status(400).json({ error: "O valor total do pagamento é obrigatório e deve ser numérico." });
      }

      // Chama o serviço para processar o pagamento
      const resultado = await this.pagamentoService.comprarIngresso({ assentosIds, total });

      // Retorna o sucesso da operação
      return res.status(200).json({ success: true, message: "Pagamento realizado com sucesso.", data: resultado });
    } catch (error) {
      // Retorna erro em caso de falha no processamento do pagamento
      console.error("Erro ao processar pagamento:", error);
      return res.status(500).json({ error: "Erro ao processar pagamento: " + error.message });
    }
  }
}
