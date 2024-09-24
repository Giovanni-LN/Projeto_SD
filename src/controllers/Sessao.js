import { playItemService } from "../services/PlayItem.js";
import { sessaoService } from "../services/Sessao.js";
import { AppError } from "../utils/AppError.js";

const getAllSessoesByPlayItem = async (req, res, next) => {
  const { nome } = req.query;

  if (!nome) {
    return next(new AppError("PlayItem name is required", 400)); 
  }

  try {
    // Busca o PlayItem pelo nome
    const playItem = await playItemService.getPlayItemByNome(nome);

    // Se o PlayItem não for encontrado, já teremos lançado um erro na função acima
    // Agora, podemos buscar as sessões usando o ID do PlayItem
    const sessoes = await sessaoService.getSessoesByPlayItemId(playItem.id);
    
    res.json(sessoes);
  } catch (error) {
    console.error("Error fetching sessions by PlayItem name:", error);
    next(new AppError("Error fetching sessions by PlayItem", 500));
  }
};

const createSessao = async (req, res, next) => {
  const { data, horario, playItemNome } = req.body;

  // Validação básica dos dados recebidos
  if (!data || !horario || !playItemNome) {
    return next(new AppError("Missing required fields: data, horario, and playItemNome", 400)); // Passa o erro para o middleware de erro
  }

  try {
    // Formatar a data para ISO-8601
    const formattedData = new Date(`${data}T${horario}:00Z`).toISOString();

    // Busca o PlayItem pelo nome
    const playItem = await playItemService.getPlayItemByNome(playItemNome); 

    if (!playItem) {
      return next(new AppError("PlayItem not found", 404)); // Se o PlayItem não for encontrado
    }

    // Criar a sessão usando o ID do PlayItem encontrado
    const newSessao = await sessaoService.createSessao({ data: formattedData, horario, playItemId: playItem.id });
    
    res.status(201).json(newSessao); // Retornando um status 201 para recurso criado
  } catch (error) {
    console.error("Error creating session:", error);
    next(new AppError("Error creating session", 500)); // Passa o erro para o middleware de erro
  }
};

const deleteSessao = async (req, res, next) => {
  const { playItemId, data, horario } = req.body;

  if (!playItemId || !data || !horario) {
    return next(new AppError("Missing required fields: playItemId, data, and horario", 400));
  }

  try {
    const formattedData = new Date(`${data}T${horario}:00Z`).toISOString();

    const deletedSessao = await sessaoService.deleteSessaoByDataHora(Number(playItemId), formattedData, horario);
    res.json({ message: "Sessão deletada com sucesso", sessao: deletedSessao });
  } catch (error) {
    console.error("Error deleting session:", error);
    next(new AppError("Error deleting session", 500));
  }
};

export default { getAllSessoesByPlayItem, createSessao, deleteSessao };
