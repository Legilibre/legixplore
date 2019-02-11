const getConteneursList = knex =>
  knex
    .table("conteneurs")
    .whereIn("etat", ["VIGUEUR", "VIGUEUR_ETEN", "VIGUEUR_NON_ETEN"])
    .orderBy("date_publi", "desc");

module.exports = getConteneursList;
