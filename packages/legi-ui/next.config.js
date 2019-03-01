const webpack = require("webpack");
const withCSS = require("@zeit/next-css");

module.exports = (phase, { defaultConfig }) => {
  return withCSS({
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  });
};
