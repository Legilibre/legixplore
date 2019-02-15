const routes = require("express").Router();

const getLegi = require("../getLegi");

routes.get("/conteneurs", async (req, res) => {
  const data = await getLegi(req.baseDILA).getConteneursList();
  res.json(data);
});

module.exports = routes;
