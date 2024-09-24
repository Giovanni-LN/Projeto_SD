import { PagamentoService } from "../services/Pagamentos.js";
import { AppError } from "../utils/AppError.js";

// Controller para lidar com requisições HTTP
export default class PagamentoController { // Usando export default
  constructor() {
    this.pagamentoService = new PagamentoService(); // Inicializa o serviço de pagamento
  }

  // Método para processar o pagamento via requisição HTTP
  async processarPagamento(req, res, next) {
    const { assentosIds, total } = req.body;

    try {
      // Validação dos dados recebidos
      if (!Array.isArray(assentosIds) || assentosIds.length === 0) {
        throw new AppError("É necessário selecionar ao menos um assento.", 400);
      }

      if (!total || typeof total !== "number") {
        throw new AppError("O valor total do pagamento é obrigatório e deve ser numérico.", 400);
      }

      // Chama o serviço para processar o pagamento
      const resultado = await this.pagamentoService.processarPagamento({ assentosIds, total });

      // Retorna o sucesso da operação
      return res.status(200).json(resultado);
    } catch (error) {
      // Passa o erro para o middleware de tratamento de erro
      next(error instanceof AppError ? error : new AppError("Erro ao processar pagamento", 500));
    }
  }
}
