const getConteneursList = (knex, filters = {}) => {
  const { etats = ["VIGUEUR", "VIGUEUR_ETEN", "VIGUEUR_NON_ETEN"] } = filters;
  return knex
    .table("conteneurs")
    .whereIn("etat", etats)
    .orderBy("date_publi", "desc");
};

module.exports = getConteneursList;
