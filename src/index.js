import cors from "cors";
import express from "express";
import "express-async-errors";
import { prisma } from "./prismaClient.js"; // Prisma Client singleton
import { routes } from "./routes/index.js";
import { AppError } from "./utils/AppError.js";

const app = express(); // Iniciando app node com express

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions)); // Tornando a API acessível a diversas origens
app.use(express.json()); // Middleware apenas para JSON

app.use(routes); // Usando todas as minhas rotas

app.use((error, req, res, next) => {
  console.error(error); // Log do erro para monitoramento

  // Verifica se o erro é do Zod (validação de schema)
  if (error.name === "ZodError") {
    return res.status(400).json({
      status: 400,
      message: error.errors.map((err) => err.message), // Mapeia e retorna as mensagens de erro
    });
  }

  // Verifica se o erro é uma instância de AppError
  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
      status: error.status,
    });
  }

  console.error("Internal server error:", error);

  // Retorna um erro genérico para qualquer outro tipo de erro
  return res.status(500).json({
    error: {
      message: "Internal server error",
      status: 500,
    }
  });
});

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`Server is running in DEVELOPMENT mode on port ${PORT}`)
);

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  process.exit(0);
});
