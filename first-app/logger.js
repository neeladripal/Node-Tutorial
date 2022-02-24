const EventEmitter = require("events");

const url1 = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("messageLogged", { id: 1, url: url1 });
  }
}
module.exports = Logger;
