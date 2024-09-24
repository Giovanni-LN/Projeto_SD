import { AssentoService, SessaoService } from "../services/assentos.js";

export class AssentosController {
  // Método para criar uma nova sessão com assentos
  async create(request, response) {
    const { nome, sessaoId, data, horario, assentos } = request.body;

    const sessaoService = new SessaoService();

    try {
      // Cria uma nova sessão com os assentos
      const newSessao = await sessaoService.createSessao({
        nome,
        sessaoId,
        data,
        horario,
        assentos,
      });

      return response.status(201).json(newSessao);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Método para listar todos os assentos
  async listAll(request, response) {
    const assentoService = new AssentoService();

    try {
      const assentos = await assentoService.listAll();
      return response.status(200).json(assentos);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar assentos.' });
    }
  }

  // Método para buscar um assento pelo número de posição
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

  // Método para listar os assentos com base no dia e no horário
  async listarAssentosPorDiaHora(request, response) {
    const { data, horario } = request.query; // Parâmetros passados na URL
    const sessaoService = new SessaoService();

    try {
      const assentos = await sessaoService.listarAssentosPorDiaHora({
        data,
        horario,
      });

      return response.status(200).json(assentos);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar assentos para o dia e hora.' });
    }
  }

  // Método para buscar as datas e horários de uma peça pelo nome
  async getDatasEHorasPorNome(request, response) {
    const { nome } = request.query; // Nome passado na URL como query parameter
    const sessaoService = new SessaoService();

    try {
      const datasEHoras = await sessaoService.getDatasEHorasPorNome({
        nome,
      });

      return response.status(200).json(datasEHoras);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Método para buscar o status dos assentos por nome, data e horário
  async getStatusAssentosPorNomeDataHora(request, response) {
    const { nome, data, horario } = request.query; // Parâmetros passados na URL
    const sessaoService = new SessaoService();

    try {
      const statusAssentos = await sessaoService.getStatusAssentosPorNomeDataHora({
        nome,
        data,
        horario,
      });

      return response.status(200).json(statusAssentos);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
