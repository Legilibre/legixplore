const routes = require("express").Router();
const memoize = require("memoizee");

const getLegi = require("../getLegi");

const getTetierData = memoize(
  (baseDILA, id) => getLegi(baseDILA).getTetier({id}),
  { promise: true }
);

/*
 parents
 liens
 versions
*/
routes.get("/tetier/:id", async (req, res) => {
  const tetier = await getTetierData(req.baseDILA, req.params.id);
  res.json(tetier);
});

module.exports = routes;
