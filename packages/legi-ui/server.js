// server.js
const next = require("next");
const routes = require("./src/routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

// With express
const express = require("express");

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(PORT);
});

