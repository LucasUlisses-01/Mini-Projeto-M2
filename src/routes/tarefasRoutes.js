import express from "express";
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
} from "../controllers/tarefasController.js";

const router = express.Router();

router.get("/", listarTarefas);
router.post("/", criarTarefa);
router.put("/:id", atualizarTarefa);
router.delete("/:id", deletarTarefa);

export default router;
