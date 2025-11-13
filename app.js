import express from 'express';
import tarefasRoutes from './src/routes/tarefasRoutes.js';
import logger from './src/middleware/logger.js';

const app = express(); 

// Middlewares
app.use(express.json());
app.use(logger);

// Rotas
app.use('/tarefas', tarefasRoutes);

// Inicializa o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

export default app;
