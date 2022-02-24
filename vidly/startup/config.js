const config = require("config");

module.exports = function () {
  // in case the jwtPrivateKey environment variable is not defined
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
  }
};
