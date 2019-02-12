const Legi = require("../src/Legi");

// module.exports = new Legi({
//   client: "pg",
//   connection: {
//     host: "vps.revolunet.com",
//     port: 5444,
//     user: "legi",
//     password: "legi",
//     database: "legi"
//   }
// });

module.exports = new Legi({
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
