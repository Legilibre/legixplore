const { getRawStructure } = require("./getStructure");
const { makeAst, cleanData, canContainChildren, getItemType } = require("./utils");
const getCodeData = require("./getCodeData");
const getConteneurData = require("./getConteneurData");

const getRow = row => ({
  type: getItemType(row),
  data: cleanData({
    id: row.id,
    titre_ta: row.titre_ta,
    position: row.position,
    parent: row.parent
  })
});

// return full structure without nested content and without articles. useful to build a navigation

const getSommaireCode = (knex, { cid, date }) =>
  getRawStructure({ knex, cid, date, maxDepth: 0 }).then(async result => ({
    // make the final AST-like structure
    type: "code",
    // add root section data if needed
    data: await getCodeData(knex, { cid }),
    children: makeAst(result.rows.filter(canContainChildren).map(getRow), cid)
  }));

const getSommaireConteneur = (knex, { conteneurId, date }) =>
  getRawStructure({ knex, conteneurId, date, maxDepth: 0 }).then(async result => ({
    // make the final AST-like structure
    type: "conteneur",
    // add root section data if needed
    data: await getConteneurData(knex, { id: conteneurId }),
    children: makeAst(result.rows.filter(canContainChildren).map(getRow), conteneurId)
  }));

module.exports = {
  getSommaireCode,
  getSommaireConteneur
};
