import { Router } from "express";
import { AssentosController } from "../controllers/AssentosController.js";

const assentosRoutes = Router();
const assentosController = new AssentosController();

// Rota para listar todos os assentos
assentosRoutes.get("/", assentosController.listAll);

// Rota para buscar um assento pelo número de posição
assentosRoutes.get("/:positionNumber", assentosController.findByPositionNumber);

// Rota para listar assentos com base em dia e hora (parâmetros via query)
assentosRoutes.get("/listar", assentosController.listarAssentosPorDiaHora);

// Rota para buscar datas e horários de uma peça pelo nome (parâmetro via query)
assentosRoutes.get("/datas-horas", assentosController.getDatasEHorasPorNome);

// Rota para buscar status dos assentos por nome, data e horário (parâmetros via query)
assentosRoutes.get("/status", assentosController.getStatusAssentosPorNomeDataHora);

// Rota para criar uma nova sessão com assentos
assentosRoutes.post("/", assentosController.create);

// Opções para atualizações futuras
// assentosRoutes.patch("/:id", assentosController.update); // Para atualizar um assento
// assentosRoutes.delete("/:id", assentosController.delete); // Para apagar um assento

export { assentosRoutes };
