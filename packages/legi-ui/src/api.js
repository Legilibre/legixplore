import fetch from "node-fetch";
import memoize from "memoizee";

export const fetchSection = memoize((code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/section/${id}`).then(r => r.json())
);

export const fetchArticle = memoize((code, id) =>
  fetch(`http://127.0.0.1:3005/texte/${code}/article/${id}`).then(r => r.json())
);

export const fetchStructure = memoize(code =>
  fetch(`http://127.0.0.1:3005/texte/${code}/structure`).then(r => r.json())
);

export const fetchNode = (code, node) => {
  if (node.type === "article") {
    return fetchArticle(code, node.data.id);
  } else if (node.type === "section") {
    return fetchSection(code, node.data.id);
  }
  return Promise.reject("invalid node type");
};
