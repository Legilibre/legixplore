const routes = require("express").Router();
const memoize = require("memoizee");
const map = require("unist-util-map");

const legi = require("../legi");

// extract basic text structure
const getStructure = tree =>
  map(tree, node => ({
    children: node.children,
    type: node.type,
    id: node.data && node.data.id,
    titre_ta: node.data.titre || node.data.titre_ta
  }));

const getSommaireData = memoize(
  id => legi.getSommaireConteneur({
    id,
    // date: "2019-01-01"
  }),
  { promise: true }
);

routes.get("/conteneur/:conteneurId/structure", async (req, res) => {
  const data = await getSommaireData(req.params.conteneurId);
  res.json(getStructure(data));
});

module.exports = routes;
