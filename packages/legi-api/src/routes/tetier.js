const routes = require("express").Router();
const memoize = require("memoizee");

const legi = require("../legi");

const getTetierData = memoize(
  (id) =>
    legi.getTetier({
      // cid: code,
      id,
      // date: "2019-01-01"
    }),
  { promise: true }
);
/*
 parents
 liens
 versions
*/
routes.get("/tetier/:id", async (req, res) => {
  const tetier = await getTetierData(req.params.id);
  res.json(tetier);
});

module.exports = routes;
