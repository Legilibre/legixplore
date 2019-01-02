// shared with server.js so dont use babel stuff
const fetch = require("node-fetch");
const memoize = require("memoizee");

const API_URL = process.env.API_URL || "http://127.0.0.1:3005";

const fetchSection = memoize((code, id) =>
  fetch(`${API_URL}/code/${code}/section/${id}`).then(r => r.json())
);

const fetchArticle = memoize((code, id) =>
  fetch(`${API_URL}/code/${code}/article/${id}`).then(r => r.json())
);

const fetchStructure = memoize(code =>
  fetch(`${API_URL}/code/${code}/structure`).then(r => r.json())
);

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
  fetchNode
};
