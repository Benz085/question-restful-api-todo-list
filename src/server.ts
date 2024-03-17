import app from "./app";
import Http from "http";

const baseUrl: string = 'http://localhost';
const configPort: string = '8000';

const port = normalizePort(configPort);
app.set("port", port);
const server = Http.createServer(app);

const debug = require("debug")("todo:server");

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

console.log(
  "  App is running at " + baseUrl + ":%d in %s mode",
  app.get("port"),
  app.get("env")
);
console.log("Exit Press CTRL-C to stop\n");


function normalizePort(val: string) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: { syscall: string; code: any }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}


export default server;
