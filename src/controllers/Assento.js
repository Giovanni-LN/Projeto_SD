import { assentoService } from "../services/Assento.js";
import { AppError } from "../utils/AppError.js";

// Controlador para obter todos os assentos
const getAllAssentos = async (req, res, next) => {
  try {
    const assentos = await assentoService.getAssentos();
    res.json(assentos);
  } catch (error) {
    next(new AppError("Error fetching seats", 500)); // Passa erro para o middleware de erro
  }
};

// Controlador para atualizar o status de um assento
const updateAssento = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validação básica
  if (!status) {
    return next(new AppError("Status is required", 400)); // Retorna erro se status não for fornecido
  }

  try {
    const updatedAssento = await assentoService.updateAssentoStatus(Number(id), status);
    if (!updatedAssento) {
      return next(new AppError("Assento not found", 404)); // Retorna erro se o assento não for encontrado
    }
    res.json(updatedAssento);
  } catch (error) {
    next(new AppError("Error updating seat", 500)); // Passa erro para o middleware de erro
  }
};

export default { getAllAssentos, updateAssento };
