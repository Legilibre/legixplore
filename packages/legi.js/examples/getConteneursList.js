const legi = require("./legi");
const { JSONlog } = require("../src/utils");

// get code sommaire
legi
  .getConteneursList()
  .then(JSONlog)
  .catch(console.log)
  .then(legi.close);
