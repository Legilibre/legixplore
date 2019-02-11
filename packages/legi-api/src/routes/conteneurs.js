const routes = require("express").Router();

const legi = require("../legi");

routes.get("/conteneurs", async (req, res) => {
  const data = await legi.getConteneursList();
  res.json(data);
});

module.exports = routes;
