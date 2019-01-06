const routes = require("@socialgouv/next-routes");

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
  .add({ name: "codes", pattern: "/codes", page: "index" })
  .add({ name: "index", pattern: "/", page: "index" });
