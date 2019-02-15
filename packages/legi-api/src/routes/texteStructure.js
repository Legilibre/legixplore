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
    titre: node.data && node.data.titre
  }));

const getSommaireData = memoize(
  id => legi.getSommaireTexte({id}), { promise: true }
);

routes.get("/texte/:texte/structure", async (req, res) => {
  const data = await getSommaireData(req.params.texte);
  res.json(getStructure(data));
});

module.exports = routes;