const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("bcra-proxy-cors server is up and running!");
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
