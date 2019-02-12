const routes = require("@socialgouv/next-routes");

module.exports = routes()
  .add({
    name: "section",
    pattern: "/:base/texte/:texte/section/:section",
    page: "code"
  })
  .add({
    name: "article",
    pattern: "/:base/texte/:texte/article/:article",
    page: "code"
  })
  .add({
    name: "texte",
    pattern: "/:base/texte/:texte",
    page: "code"
  })
  .add({
    name: "tetier",
    pattern: "/:base/texte/:texte/tetier/:tetier",
    page: "code"
  })
  .add({ name: "codes", pattern: "/:base/codes", page: "codes" })
  .add({ name: "bases", pattern: "/", page: "index" });
