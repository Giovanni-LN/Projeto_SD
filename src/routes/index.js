import { Router } from "express";

import { assentosRoutes } from "./assentos.routes.js";

const routes = Router();
routes.use("/assentos", assentosRoutes);

export { routes };
