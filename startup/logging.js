require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://173.82.212.25/mavecomErrors",
    level: "info"
  });
};
