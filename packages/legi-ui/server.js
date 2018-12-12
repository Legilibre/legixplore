// server.js
const next = require("next");

const { fetchArticle, fetchSection, fetchStructure } = require("./src/api");
const routes = require("./src/routes");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const express = require("express");

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  express()
    // API proxy
    .get("/code/:code.json", async (req, res) => {
      res.json(await fetchStructure(req.params.code));
    })
    .get("/code/:code/article/:article.json", async (req, res) => {
      res.json(await fetchArticle(req.params.code, req.params.article));
    })
    .get("/code/:code/section/:section.json", async (req, res) => {
      res.json(await fetchSection(req.params.code, req.params.section));
    })
    // next-routes handler
    .use(handler)
    .listen(PORT);
});
