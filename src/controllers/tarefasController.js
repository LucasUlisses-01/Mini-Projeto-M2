import { tarefas } from '../data/tarefasData.js';

export const listarTarefas = (req, res) => {
  res.json(tarefas);
};

export const criarTarefa = (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: req.body.titulo,
    concluida: false,
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

export const atualizarTarefa = (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;

  const tarefa = tarefas.find((t) => t.id === parseInt(id));
  if (!tarefa) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  if (titulo) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.json(tarefa);
};

export const deletarTarefa = (req, res) => {
  const { id } = req.params;
  const index = tarefas.findIndex((t) => t.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ mensagem: "Tarefa não encontrada" });
  }

  tarefas.splice(index, 1);
  res.status(204).send();
};
