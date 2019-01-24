const { getRawStructure } = require("./getStructure");
const { makeAst, cleanData } = require("./utils");
const getCodeData = require("./getCodeData");

const isSection = id => id.substring(0, 8) === "LEGISCTA";

const getRow = row => ({
  type: "section",
  data: cleanData({
    id: row.id,
    titre_ta: row.titre_ta,
    position: row.position,
    parent: row.parent
  })
});

// return full structure without nested content and without articles. useful to build a navigation
const getSommaire = async (knex, { cid, date }) => {
  // we first check the real cid from textes_versions
  const realCid = await knex
    .table("textes_versions")
    .select("cid")
    .where("id", cid)
    .first();
  const currentCid = (realCid && realCid.cid) || cid;
  return getRawStructure({ knex, cid: currentCid, date, maxDepth: 0 }).then(async result => ({
    // make the final AST-like structure
    type: "code",
    // add root section data if needed
    data: await getCodeData(knex, { cid: currentCid }),
    children: makeAst(result.rows.filter(row => isSection(row.id)).map(getRow))
  }));
};

module.exports = getSommaire;
