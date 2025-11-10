const express = require("express");
const app = express();
const professoresRoutes = require("./routes/professoresRoutes");

app.use(express.json()); 
app.use("/professores", professoresRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
