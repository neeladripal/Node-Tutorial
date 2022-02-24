const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  // parse json objects from request body
  app.use(express.json());
  // parse form type key-value pairs
  // app.use(express.urlencoded({ extended: true }));
  // serve static assets, move every css, image inside folder 'public'
  // although they are inside a folder, static content is served from
  // the root of the site, so folder is not included inside url
  // app.use(express.static("public"));
  // app.use(helmet());
  // use export DEBUG=app:startup to enable startupDebugger
  // const startupDebugger = require("debug")("app:startup");

  // Configuration
  // console.log("Application Name: " + config.get("name"));
  // console.log("Mail Server: " + config.get("mail.host"));

  // console.log(`NODE_ENV: ${process.env.NODE_ENV}`);     // undefined
  // console.log(`app: ${app.get("env")}`);      // development

  // if (app.get("env") === "development") {
  //   app.use(morgan("tiny"));
  //   startupDebugger("Morgan enabled...");
  // }
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
