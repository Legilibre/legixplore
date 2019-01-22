// shared with server.js so dont use babel stuff
const nodeFetch = require("node-fetch");
const memoize = require("memoizee");

const API_URL = process.env.API_URL || "https://legi-api.now.sh"; // http://127.0.0.1:3005";

const fetch = params => console.log("fetch", params) || nodeFetch(params);

const fetchSection = memoize((code, id) =>
  fetch(`${API_URL}/code/${code}/section/${id}`).then(r => r.json())
);

const fetchArticle = memoize((code, id) =>
  fetch(`${API_URL}/code/${code}/article/${id}`).then(r => r.json())
);

const fetchStructure = memoize(code =>
  fetch(`${API_URL}/code/${code}/structure`).then(r => r.json())
);

const fetchCodes = memoize(() => fetch(`${API_URL}/codes`).then(r => r.json()));

const fetchNode = (code, node) => {
  if (node.type === "article") {
    return fetchArticle(code, node.data.id);
  } else if (node.type === "section") {
    return fetchSection(code, node.data.id);
  }
  return Promise.reject("invalid node type");
};

module.exports = {
  fetchSection,
  fetchArticle,
  fetchStructure,
  fetchCodes,
  fetchNode
};
