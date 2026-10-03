const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "APK Lock API"
  });
});

app.post("/check", (req, res) => {
  const codigo = String(req.body.codigo || "");
  const codigoCorreto = process.env.LOCK_CODE;

  if (!codigoCorreto) {
    return res.status(500).json({
      valido: false,
      erro: "LOCK_CODE não configurado"
    });
  }

  if (codigo === codigoCorreto) {
    return res.json({
      valido: true
    });
  }

  return res.status(401).json({
    valido: false
  });
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
