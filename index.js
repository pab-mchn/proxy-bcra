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
        <h1>BCRA Proxy CORS</h1>
        <p>Se trata de un servidor proxy que permite acceder a la API del Banco Central de Argentina sin encontrarse con conflictos de CORS.</p>
        <p>Encontra mas información y ejemplos sobre como utilizarlo <a href="https://onthecodeblog.blogspot.com/2023/10/solucionando-conflictos-de-cors-al.html">en este articulo</a>.</p>
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
