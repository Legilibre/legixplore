const express = require("express");
const cors = require("cors");

const pkg = require("../package.json");

const app = express();
app.use(cors());

app.use("/", require("./routes/codeStructure"));
app.use("/", require("./routes/conteneurStructure"));
app.use("/", require("./routes/section"));
app.use("/", require("./routes/article"));
app.use("/", require("./routes/tetier"));
app.use("/", require("./routes/codes"));
app.use("/", require("./routes/conteneurs"));
// TODO : can't we use /routes/* ?

app.get("/", (req, res) => res.send({ version: pkg.version, name: pkg.name }));

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`listening on http://127.0.0.1:${PORT}`);
});
