const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let tarefas = [];
let idAtual = 1;

// 🏠 Rota inicial
app.get("/", (req, res) => {
  res.send("Bem-vindo à API de tarefas!");
});

// 📋 Listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// ➕ Criar nova tarefa
app.post("/tarefas", (req, res) => {
  const { titulo, status } = req.body;

  if (!titulo) {
    return res.status(400).json({ mensagem: "O título é obrigatório." });
  }

  const novaTarefa = {
    id: idAtual++,
    titulo,
    status: status || "pendente"
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// ✏️ Atualizar status da tarefa
app.put("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada." });
  }

  tarefa.status = status || tarefa.status;
  res.json(tarefa);
});

// ❌ Deletar tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tarefas = tarefas.filter(t => t.id !== id);
  res.status(204).send();
});

// 🚀 Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
