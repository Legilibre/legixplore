const routes = require("@socialgouv/next-routes");

// Name   Page      Pattern
module.exports = routes()
  .add({
    name: "section",
    pattern: "/code/:code/section/:section",
    page: "code"
  })
  .add({
    name: "article",
    pattern: "/code/:code/article/:article",
    page: "code"
  })
  .add({
    name: "code",
    pattern: "/code/:code",
    page: "code"
  })
  .add({ name: "index", pattern: "/", page: "index" });
