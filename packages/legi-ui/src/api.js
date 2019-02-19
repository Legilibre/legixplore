// shared with server.js so dont use babel stuff
const nodeFetch = require("node-fetch");
const memoize = require("memoizee");

const API_URL = process.env.API_URL || "https://legi-api.now.sh"; // http://127.0.0.1:3005";

const fetch = params => console.log("fetch", params) || nodeFetch(params);

const fetchSection = memoize((id, base) =>
  fetch(`${API_URL}/v1/base/${base}/section/${id}`).then(r => r.json())
);

const fetchArticle = memoize((id, base) =>
  fetch(`${API_URL}/v1/base/${base}/article/${id}`).then(r => r.json())
);

const fetchTetier = memoize((id, base) =>
  fetch(`${API_URL}/v1/base/${base}/tetier/${id}`).then(r => r.json())
);

const fetchTexteStructure = memoize((id, base) =>
  fetch(`${API_URL}/v1/base/${base}/texte/${id}/structure`).then(r => r.json())
);
const fetchConteneurStructure = memoize((id, base) =>
  fetch(`${API_URL}/v1/base/${base}/conteneur/${id}/structure`).then(r => r.json())
);

const fetchCodes = memoize((base) =>
  fetch(`${API_URL}/v1/base/${base}/codes`).then(r => r.json())
);
const fetchConteneurs = memoize((base) =>
  fetch(`${API_URL}/v1/base/${base}/conteneurs`).then(r => r.json())
);


module.exports = {
  fetchSection,
  fetchArticle,
  fetchTetier,
  fetchTexteStructure,
  fetchConteneurStructure,
  fetchCodes,
  fetchConteneurs
};
