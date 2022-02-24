const logger = require("../startup/logging");
module.exports = function (err, req, res, next) {
  logger.error(err.message);
  res.status(500).send("Something failed.");
};
