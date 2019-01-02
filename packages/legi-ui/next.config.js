const webpack = require("webpack");
const withCSS = require("@zeit/next-css");

module.exports = (phase, { defaultConfig }) => {
  return withCSS({
    // https://github.com/zeit/next.js/#disabling-file-system-routing
    useFileSystemPublicRoutes: false,
    webpack: config => {
      config.plugins.push(new webpack.EnvironmentPlugin(process.env));
      return config;
    }
  });
};
