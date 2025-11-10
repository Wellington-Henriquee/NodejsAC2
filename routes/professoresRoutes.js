const express = require("express");
const router = express.Router();
let professores = require("../controllerProfessor/professores");

router.get("/", (req, res) => {
  res.json(professores);
});

router.get("/:id", (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);
  professor ? res.json(professor) : res.status(404).send("Id não existente");
});

router.get("/:id/turmas", (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);
  professor ? res.json(professor.turmas) : res.status(404).send("Id não existente");
});

router.put("/:id", (req, res) => {
  const index = professores.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).send("Id não existente");

  const { nome, idade, departamento } = req.body;
  professores[index] = {
    ...professores[index],
    nome: nome || professores[index].nome,
    idade: idade || professores[index].idade,
    departamento: departamento || professores[index].departamento
  };
  res.json(professores[index]);
});

router.post("/:id/turmas", (req, res) => {
  const professor = professores.find(p => p.id === req.params.id);
  if (!professor) return res.status(404).send("Id não existente");

  const { codigo, disciplina, alunos } = req.body;
  professor.turmas.push({ codigo, disciplina, alunos });
  res.json(professor);
});


router.get("/departamento/:departamento", (req, res) => {
  const resultado = professores.filter(
    p => p.departamento.toLowerCase() === req.params.departamento.toLowerCase()
  );
  res.json(resultado);
});


router.delete("/:id", (req, res) => {
  const index = professores.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).send("Id não existente");

  professores.splice(index, 1);
  res.send("Professor removido com sucesso!");
});

module.exports = router;
