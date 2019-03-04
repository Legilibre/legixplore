const legi = require("./legi");
const { JSONlog } = require("../src/utils");

// get code sommaire
legi
  .getConteneursList({ etats: ["VIGUEUR_ETEN"] })
  .then(JSONlog)
  .catch(console.log)
  .then(legi.close);
