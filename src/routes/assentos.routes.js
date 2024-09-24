import { Router } from "express";
import { AssentosController } from "../controllers/AssentosController.js";

const assentosRoutes = Router();
const assentosController = new AssentosController();

// Rota para criar uma nova sessão com assentos
assentosRoutes.post("/", assentosController.create);

// Rota para buscar um assento pelo número de posição
assentosRoutes.get("/:positionNumber", assentosController.findByPositionNumber);

// Rota para listar todos os assentos
assentosRoutes.get("/", assentosController.listAll);

// Rota para listar assentos com base em dia e hora (parâmetros via query)
assentosRoutes.get("/listar", assentosController.listarAssentosPorDiaHora);

// Rota para buscar datas e horários de uma peça pelo nome (parâmetro via query)
assentosRoutes.get("/datas-horas", assentosController.getDatasEHorasPorNome);

// Rota para buscar status dos assentos por nome, data e horário (parâmetros via query)
assentosRoutes.get("/status", assentosController.getStatusAssentosPorNomeDataHora);

// Opções para atualizações futuras
// .patch ou .put para atualizar
// .delete para apagar

export { assentosRoutes };
