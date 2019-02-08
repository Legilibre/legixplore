const legi = require("./legi");
const { JSONlog } = require("../src/utils");

// get code structure
legi
  .getCode({ cid: "LEGITEXT000006072050", date: "2019-01-01" })
  .then(JSONlog)
  .catch(console.log)
  .then(legi.close);
