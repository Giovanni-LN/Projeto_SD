import { sessaoService } from "../services/Sessao.js";
import { AppError } from "../utils/AppError.js";

const getAllSessoes = async (req, res, next) => {
  try {
    const sessoes = await sessaoService.getSessoes();
    res.json(sessoes);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    next(new AppError("Error fetching sessions", 500)); // Passa o erro para o middleware de erro
  }
};

const createSessao = async (req, res, next) => {
  const { data, horario, playItemId } = req.body;

  // Validação básica dos dados recebidos
  if (!data || !horario || !playItemId) {
    return next(new AppError("Missing required fields: data, horario, and playItemId", 400)); // Passa o erro para o middleware de erro
  }

  try {
    const newSessao = await sessaoService.createSessao({ data, horario, playItemId });
    res.status(201).json(newSessao); // Retornando um status 201 para recurso criado
  } catch (error) {
    console.error("Error creating session:", error);
    next(new AppError("Error creating session", 500)); // Passa o erro para o middleware de erro
  }
};

const getSessaoById = async (req, res, next) => {
  const { id } = req.params; // Obtendo o ID da sessão a partir dos parâmetros da rota

  try {
    const sessao = await sessaoService.getSessaoById(id); // Chama o serviço para obter a sessão
    if (!sessao) {
      return next(new AppError("Session not found", 404)); // Se a sessão não for encontrada, passa o erro para o middleware
    }
    res.json(sessao); // Retorna a sessão encontrada
  } catch (error) {
    console.error("Error fetching session by ID:", error);
    next(new AppError("Error fetching session by ID", 500)); // Passa o erro para o middleware de erro
  }
};

export default { getAllSessoes, createSessao, getSessaoById };
