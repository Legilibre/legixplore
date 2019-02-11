const routes = require("@socialgouv/next-routes");

module.exports = routes()
  .add({
    name: "section",
    pattern: "/:base/code/:code/section/:section",
    page: "code"
  })
  .add({
    name: "article",
    pattern: "/:base/code/:code/article/:article",
    page: "code"
  })
  .add({
    name: "code",
    pattern: "/:base/code/:code",
    page: "code"
  })
  .add({
    name: "tetier",
    pattern: "/:base/code/:code/tetier/:tetier",
    page: "code"
  })
  .add({ name: "codes", pattern: "/:base/codes", page: "codes" })
  .add({ name: "bases", pattern: "/", page: "index" });
