const Legi = require("../../legi.js/src/index.js");
// const legi = new Legi();
const getLegi = (baseDILA) => new Legi({
  client: "pg",
  version: "9.6",
  connection: {
    host: "127.0.0.1",
    port: 5444,
    user: "user",
    password: "pass",
    database: baseDILA.toLowerCase()
  },
  pool: {
    min: 0,
    max: 5
  }
});

module.exports = getLegi;
