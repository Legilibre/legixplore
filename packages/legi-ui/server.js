const express = require("express");
const next = require("next");

const {
  fetchArticle,
  fetchSection,
  fetchStructure,
  fetchCodes
} = require("./src/api");
const routes = require("./src/routes");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  express()
    // API proxy
    .get("/codes.json", async (req, res) => {
      res.json(await fetchCodes());
    })
    .get("/texte/:texte.json", async (req, res) => {
      res.json(await fetchStructure(req.params.texte));
    })
    .get("/textearticle/:article.json", async (req, res) => {
      res.json(await fetchArticle(req.params.article));
    })
    .get("/texte/:texte/section/:section.json", async (req, res) => {
      res.json(await fetchSection(req.params.section));
    })
    // next-routes handler
    .use(handler)
    .listen(PORT);
});
