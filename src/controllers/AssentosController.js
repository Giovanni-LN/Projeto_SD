import { AssentoService, SessaoService } from "../services/assentos.js";

export class AssentosController {
  async create(request, response) {
    const { nome, sessaoId, horario, assentos } = request.body; // Atualizado para receber dados da sessão

    const sessaoService = new SessaoService();

    try {
      const newSessao = await sessaoService.createSessao({ nome, sessaoId, horario, assentos });
      return response.status(201).json(newSessao);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
  
  async listAll(request, response) {
    const assentoService = new AssentoService();

    try {
      const assentos = await assentoService.listAll();
      return response.status(200).json(assentos);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar assentos.' });
    }
  }
  
  async findByPositionNumber(request, response) {
    const { positionNumber } = request.params;
    const assentoService = new AssentoService();

    try {
      const assento = await assentoService.findByPositionNumber({ positionNumber });
      if (!assento) {
        return response.status(404).json({ error: 'Assento não encontrado.' });
      }
      return response.status(200).json(assento);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
