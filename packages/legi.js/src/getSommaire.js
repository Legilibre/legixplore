const { getRawStructure } = require("./getStructure");
const { makeAst, cleanData, canContainChildren, getItemType } = require("./utils");
const getTexteData = require("./getTexteData");
const getConteneurData = require("./getConteneurData");

const getRow = row => ({
  type: getItemType(row),
  data: cleanData({
    id: row.id,
    titre: row.titre_ta,
    position: row.position,
    parent: row.parent
  })
});

// return full structure without nested content and without articles. useful to build a navigation

const getSommaireTexte = (knex, { id, date }) => {
  return getRawStructure({ knex, parentId: id, date, maxDepth: 0 }).then(async result => ({
    // make the final AST-like structure
    type: "texte",
    // add root section data if needed
    data: await getTexteData(knex, { id }),
    children: makeAst(result.rows.filter(canContainChildren).map(getRow), id)
  }));
}

const getSommaireConteneur = (knex, { id, date }) =>
  getRawStructure({ knex, parentId: id, date, maxDepth: 0 }).then(async result => ({
    // make the final AST-like structure
    type: "conteneur",
    // add root section data if needed
    data: await getConteneurData(knex, { id: id }),
    children: makeAst(result.rows.filter(canContainChildren).map(getRow), id)
  }));

module.exports = {
  getSommaireTexte,
  getSommaireConteneur
};
