// shared with server.js so dont use babel stuff
const nodeFetch = require("node-fetch");
const memoize = require("memoizee");

const API_URL = process.env.API_URL || "https://legi-api.now.sh"; // http://127.0.0.1:3005";

const fetch = params => console.log("fetch", params) || nodeFetch(params);

const fetchSection = memoize((id) =>
  fetch(`${API_URL}/section/${id}`).then(r => r.json())
);

const fetchArticle = memoize((id) =>
  fetch(`${API_URL}/article/${id}`).then(r => r.json())
);

const fetchTetier = memoize((id) =>
  fetch(`${API_URL}/tetier/${id}`).then(r => r.json())
);

const fetchTexteStructure = memoize(texte =>
  fetch(`${API_URL}/texte/${texte}/structure`).then(r => r.json())
);
const fetchConteneurStructure = memoize(texte =>
  fetch(`${API_URL}/conteneur/${texte}/structure`).then(r => r.json())
);

const fetchCodes = memoize(() => fetch(`${API_URL}/codes`).then(r => r.json()));
const fetchConteneurs = memoize(() =>
  fetch(`${API_URL}/conteneurs`).then(r => r.json())
);

const fetchNode = (node) => {
  if (node.type === "article") {
    return fetchArticle(node.data.id);
  } else if (node.type === "section") {
    return fetchSection(node.data.id);
  }
  return Promise.reject("invalid node type");
};

module.exports = {
  fetchSection,
  fetchArticle,
  fetchTetier,
  fetchTexteStructure,
  fetchConteneurStructure,
  fetchCodes,
  fetchConteneurs,
  fetchNode
};
