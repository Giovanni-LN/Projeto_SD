import { Router } from "express";
import assentosRoutes from "./Assento.routes.js";
import pagamentosRoutes from "./Pagamentos.routes.js";
import playItemRoutes from "./PlayItem.routes.js";
import sessaoRoutes from "./Sessao.routes.js";

const routes = Router();

// Adiciona as rotas de assentos
routes.use("/assentos", assentosRoutes);

// Adiciona as rotas de pagamento
routes.use("/pagamento", pagamentosRoutes);

// Adiciona as rotas de PlayItem
routes.use("/playitems", playItemRoutes);

// Adiciona as rotas de Sessao
routes.use("/sessoes", sessaoRoutes);

export { routes };
