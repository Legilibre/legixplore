const routes = require("express").Router();
const memoize = require("memoizee");

const legi = require("../../legi");

const getSectionData = memoize(
  (code, section) =>
    legi.getSection({
      cid: code,
      id: section,
      date: "2019-01-01"
    }),
  { promise: true }
);

routes.get("/code/:code/section/:section", async (req, res) => {
  const section = await getSectionData(req.params.code, req.params.section);
  res.json(section);
});

module.exports = routes;
