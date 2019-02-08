const makeArticle = require("./makeArticle");
const makeSection = require("./makeSection");
const makeTetier = require("./makeTetier");
const makeTexte = require("./makeTexte");
const { getItemType } = require("./utils");

const makeItem = itemType => {
  return {
    article: makeArticle,
    section: makeSection,
    tetier: makeTetier,
    texte: makeTexte
  }[itemType];
};

// postgreSQL queries to get the full structure in a single-query

// basic SQL date/vigueur filters
const getSommaireFilters = (cid, date) =>
  `cid='${cid}' and sommaires.debut <= '${date}' and (sommaires.fin > '${date}' or sommaires.fin = '${date}' or sommaires.etat = 'VIGUEUR')`;

// add sections + articles basic data from the sommaires results
const getStructureSQL = ({
  cid,
  date,
  initialCondition = "sommaires.parent is null",
  maxDepth = 1
}) => `

${/* DECLARE RECURSIVE FUNCTION */ ""}
${/* get full structure in a one-shot flat array */ ""}

 WITH RECURSIVE hierarchie(element, depth) AS (
  SELECT sommaires.element, 0 as depth, sommaires.position, sommaires.etat, sommaires.num, sommaires.parent, sommaires.debut, sommaires.fin
    FROM sommaires
    WHERE ${getSommaireFilters(cid, date)}
    and ${initialCondition}
  UNION ALL
  SELECT DISTINCT sommaires.element, depth + 1 as depth, sommaires.position, sommaires.etat, sommaires.num, sommaires.parent, sommaires.debut, sommaires.fin
    FROM sommaires, hierarchie
    WHERE ${getSommaireFilters(cid, date)}
    and sommaires.parent = hierarchie.element
    ${maxDepth > 0 ? `and depth <= ${Math.max(0, maxDepth - 1)}` : ``}
 )

${/* map some data from previous recursive call */ ""}

SELECT
  hierarchie.element as id,
  hierarchie.parent,
  tetiers.titre_tm as titre_ta,
  hierarchie.position,
  hierarchie.etat,
  hierarchie.num
FROM hierarchie
LEFT JOIN tetiers ON tetiers.id = hierarchie.element
WHERE SUBSTR(hierarchie.element, 5, 2) = 'TM'
UNION ALL(
  SELECT
    hierarchie.element AS id,
    hierarchie.parent,
    textes_versions.titre AS titre_ta,
    hierarchie.position,
    hierarchie.etat,
    NULL AS num
  FROM hierarchie
  LEFT JOIN textes_versions ON textes_versions.id = hierarchie.element
  WHERE SUBSTR(hierarchie.element, 5, 4) = 'TEXT'
)
UNION ALL(
  SELECT
    hierarchie.element AS id,
    hierarchie.parent,
    sections.titre_ta,
    hierarchie.position,
    hierarchie.etat,
    null AS num
  FROM hierarchie
  LEFT JOIN sections ON sections.id = hierarchie.element
  WHERE SUBSTR(hierarchie.element, 5, 4) = 'SCTA'
)
UNION ALL(
  SELECT
    hierarchie.element as id,
    hierarchie.parent,
    CONCAT('Article ', COALESCE(hierarchie.num, articles.num)) as titre_ta,
    hierarchie.position,
    hierarchie.etat,
    COALESCE(hierarchie.num, articles.num, 'inconnu')
  FROM hierarchie
  LEFT JOIN articles ON articles.id = hierarchie.element
  WHERE SUBSTR(hierarchie.element, 5, 4) = 'ARTI'
  ORDER BY articles.id
)
`;

// SQL where id IN (x, y, z) query
const getRowsIn = (knex, table, ids, key = "id") => knex.from(table).whereIn(key, ids);

const getInitialCondition = (cid, conteneurId, section) => {
  if (section) {
    return `sommaires.element='${section}'`;
  } else if (conteneurId) {
    return `sommaires.parent='${conteneurId}'`;
  } else {
    return `sommaires.parent='${cid}'`;
  }
};

const itemTypeToTable = itemType => (itemType == "texte" ? "textes_versions" : `${itemType}s`);

// get flat rows with the articles/sections for given section/date
const getRawStructure = async ({ knex, cid, conteneurId, section, date, maxDepth = 0 }) =>
  knex.raw(
    getStructureSQL({
      date,
      cid,
      conteneurId,
      maxDepth,
      initialCondition: getInitialCondition(cid, conteneurId, section)
    })
  );

// build AST-like deep structure for a given node
// useful for full data dumps
const getStructure = async ({
  knex,
  cid,
  conteneurId = undefined,
  section = undefined,
  date,
  maxDepth = 0
}) =>
  getRawStructure({ knex, cid, section, conteneurId, date, maxDepth }).then(async result => {
    // cache related data
    const cache = {};
    for (const itemType of ["article", "texte", "section", "tetier"]) {
      cache[itemTypeToTable(itemType)] = await getRowsIn(
        knex,
        itemTypeToTable(itemType),
        result.rows.filter(row => getItemType(row) === itemType).map(row => row.id)
      );
    }

    // enrich sommaire rows with related data (sections, articles)
    // add hierarchical data so we can build an AST later on
    const getRow = row => {
      const itemType = getItemType(row);
      const item = cache[itemTypeToTable(itemType)].find(item => item.id === row.id);
      return makeItem(itemType)({
        ...item,
        position: row.position,
        parent: row.parent
      });
    };
    return result.rows.map(getRow);
  });

module.exports = { getStructure, getRawStructure };
