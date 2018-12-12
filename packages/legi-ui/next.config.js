let PHASE_PRODUCTION_SERVER = "PHASE_PRODUCTION_SERVER";

try {
  let { PHASE_PRODUCTION_SERVER } = require("next-server/constants");
} catch (e) {
  // pass
}

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      /* production only config */
      // https://github.com/zeit/next.js/#disabling-file-system-routing
      useFileSystemPublicRoutes: false
    };
  }
  const withCSS = require("@zeit/next-css");
  return withCSS({
    // https://github.com/zeit/next.js/#disabling-file-system-routing
    useFileSystemPublicRoutes: false
  });
};
