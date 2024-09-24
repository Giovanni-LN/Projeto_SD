import { assentoService } from "../services/Assento.js";
import { AppError } from "../utils/AppError.js";

// Controlador para obter assentos de uma sessão específica
const getAssentosBySessao = async (req, res, next) => {
  const { sessaoId } = req.params;

  try {
    const assentos = await assentoService.getAssentosBySessao(Number(sessaoId));
    res.json(assentos);
  } catch (error) {
    next(new AppError("Error fetching seats for the session", 500));
  }
};

// Controlador para atualizar o status de múltiplos assentos
const updateAssentos = async (req, res, next) => {
  const { ids, status } = req.body;

  if (!ids || !Array.isArray(ids) || !status) {
    return next(new AppError("Valid ids array and status are required", 400)); // Retorna erro se não forem fornecidos
  }

  try {
    const updatedAssentos = await assentoService.updateAssentosStatus(ids, status);
    res.json(updatedAssentos);
  } catch (error) {
    next(new AppError("Error updating seats", 500)); // Passa erro para o middleware de erro
  }
};

export default { getAssentosBySessao, updateAssentos };
