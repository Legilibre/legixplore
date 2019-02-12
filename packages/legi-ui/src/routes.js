const routes = require("@socialgouv/next-routes");

module.exports = routes()
  .add({
    name: "conteneur",
    pattern: "/:base/conteneur/:conteneur",
    page: "conteneur"
  })
  .add({
    name: "tetier",
    pattern: "/:base/conteneur/:conteneur/tetier/:tetier",
    page: "tetier"
  })
  .add({
    name: "texte",
    pattern: "/:base/texte/:texte",
    page: "texte"
  })
  .add({
    name: "section",
    pattern: "/:base/texte/:texte/section/:section",
    page: "section"
  })
  .add({
    name: "article",
    pattern: "/:base/texte/:texte/article/:article",
    page: "article"
  })
  .add({ name: "codes", pattern: "/:base/codes", page: "codes" })
  .add({ name: "bases", pattern: "/", page: "index" });
