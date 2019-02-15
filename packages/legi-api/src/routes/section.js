const routes = require("express").Router();
const memoize = require("memoizee");

const getLegi = require("../getLegi");

const getSectionData = memoize(
  (baseDILA, id) => getLegi(baseDILA).getSection({id}),
  { promise: true }
);

routes.get("/section/:section", async (req, res) => {
  const section = await getSectionData(req.baseDILA, req.params.section);
  res.json(section);
});

module.exports = routes;
