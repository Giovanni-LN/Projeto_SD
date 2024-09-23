import { Router } from "express";
import { assentosRoutes } from "./assentos.routes.js";
import { pagamentosRoutes } from "./pagamentos.routes.js"; // Importa as rotas de pagamento

const routes = Router();

// Adiciona as rotas de assentos
routes.use("/assentos", assentosRoutes);

// Adiciona as rotas de pagamento
routes.use("/pagamentos", pagamentosRoutes); // Mudei para plural para consistência

export { routes };
