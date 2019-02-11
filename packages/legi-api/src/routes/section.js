const routes = require("express").Router();
const memoize = require("memoizee");

const legi = require("../legi");

const getSectionData = memoize(
  (id) =>
    legi.getSection({
      // cid: code,
      id,
      // date: "2019-01-01"
    }),
  { promise: true }
);

routes.get("/section/:section", async (req, res) => {
  const section = await getSectionData(req.params.section);
  res.json(section);
});

module.exports = routes;
