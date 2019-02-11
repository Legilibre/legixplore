const routes = require("express").Router();
const memoize = require("memoizee");

const legi = require("../legi");

const getArticleData = memoize(
  (id) =>
    legi.getArticle({
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
routes.get("/article/:article", async (req, res) => {
  const article = await getArticleData(req.params.article);
  res.json(article);
});

module.exports = routes;
