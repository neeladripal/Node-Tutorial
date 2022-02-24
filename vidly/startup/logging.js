require("winston-mongodb");
require("express-async-errors");
const { createLogger, transports, format } = require("winston");

module.exports = createLogger({
  transports: [
    new transports.Console({ format: format.simple() }),
    new transports.File({ filename: "logfile.log" }),
    new transports.MongoDB({
      db: "mongodb://127.0.0.1:27017/vidly",
      level: "warn",
      options: { useUnifiedTopology: true },
    }),
  ],
  exceptionHandlers: [
    new transports.Console({ format: format.simple() }),
    new transports.File({ filename: "exceptions.log" }),
  ],
});

// process.on("uncaughtException", (ex) => {
//   logger.error(ex.message);
//   process.exit(1);
// });

// process.on("unHandledRejection", (ex) => {
//   logger.error(ex.message);
//   process.exit(1);
// });
