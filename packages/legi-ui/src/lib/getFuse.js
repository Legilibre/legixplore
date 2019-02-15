import Fuse from "fuse.js";

const getFuse = data => new Fuse(data, {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  includeMatches: true,
  //findAllMatches: true,
  includeScore: true,
  threshold: 0.5,
  //location: 0,
  //distance: 100,
  maxPatternLength: 16,
  minMatchCharLength: 1,
  keys: ["titre"]
});

export default getFuse;
