const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>BCRA Proxy CORS</title>
      </head>
      <body>
        <h1>Bienvenido a BCRA Proxy CORS</h1>
        <p>Se trata de un servidor proxy que permite acceder a la API del Banco Central de Argentina sin encontrarse con conflictos de CORS.</p>
        <p>Encontra mas información y ejemplos sobre como utilizarlo <a href="https://medium.com/@onthecodenow/solucionando-conflictos-de-cors-al-acceder-a-la-api-del-banco-central-de-argentina-aaf4eb9d2b0f">en este articulo</a>.</p>

      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.get("/:url(*)", (req, res) => {
  const apiUrl = `https://api.estadisticasbcra.com/${req.params.url}`;
  const headers = {
    Authorization: req.get("Authorization"),
    "Content-Type": "application/json",
  };

  fetch(apiUrl, { headers, mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
