const Legi = require("../../legi.js");
// const legi = new Legi();
const legi = new Legi({
  client: "pg",
  version: "9.6",
  connection: {
    host: "127.0.0.1",
    port: 5444,
    user: "user",
    password: "pass",
    database: "kali"
  },
  pool: {
    min: 0,
    max: 5
  }
});

module.exports = legi;
