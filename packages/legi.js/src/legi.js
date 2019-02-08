const knexRequire = require("knex");

const defaultKnexConfig = require("./knexfile");

const legi = (knexConfig = {}) => {
  const knex = knexRequire({
    ...defaultKnexConfig,
    ...knexConfig
  });

  // tasty curry
  const knexify = module => params => module(knex, params);

  // the public API methods handlers will receive current knex connection as 1st arg
  return {
    getCode: knexify(require("./getCode")),
    getConteneur: knexify(require("./getConteneur")),
    getCodesList: knexify(require("./getCodesList")),
    getArticle: knexify(require("./getArticle")),
    getSection: knexify(require("./getSection")),
    getSommaireCode: knexify(require("./getSommaire").getSommaireCode),
    getSommaireConteneur: knexify(require("./getSommaire").getSommaireConteneur),
    close: () => knex && knex.destroy(),
    knex
  };
};

class Legi {
  constructor(knexConfig) {
    return legi(knexConfig);
  }
}

module.exports = Legi;
