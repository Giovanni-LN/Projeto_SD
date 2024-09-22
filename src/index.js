import "express-async-errors";
import express from "express";
import { AppError } from "./utils/AppError.js";
import { routes } from "./routes/index.js";
import cors from "cors";
import { prisma } from "./prismaClient.js"; // Prisma Client singleton

const app = express(); // iniciando app node com express

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions)); // tornando a api acessível a diversas origens

app.use(express.json()); // fazendo os middlewares apenas trabalhar com json e suas formatações

app.use(routes); // usando todas as minhas rotas
app.use((error, req, res, next) => {
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

  // Retorna um erro genérico para qualquer outro tipo de erro
  return res.status(500).json({
    status: 500,
    message: "Internal server error",
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
