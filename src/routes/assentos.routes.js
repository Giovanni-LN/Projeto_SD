import { Router } from "express";
import { AssentosController } from "../controllers/AssentosController.js";

const assentosRoutes = Router();
const assentosController = new AssentosController();

assentosRoutes.post("/", assentosController.create);
assentosRoutes.get("/:positionNumber", assentosController.findByPositionNumber);
assentosRoutes.get("/", assentosController.listAll);
//.patch ou .put para atualizar
// .delete para apagar
export { assentosRoutes };
