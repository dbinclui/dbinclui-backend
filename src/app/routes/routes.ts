import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
  res.status(200).json({ message: "Bem vindo a API DBInclui" });
});

router.get("*", function (req, res) {
  res.status(200).json({message: "Ish, nada aqui O.o"});
});

export default router;
