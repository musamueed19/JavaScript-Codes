import express from "express";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import { connect } from "./socket/connection.js";

// intialize variables
const app = express();
const port = 3000;
const host = "0.0.0.0";

// create Node.js HTTP Client server
// This is for both, SocketIO and Express server to listen, and work together on the same port
const server = http.createServer(app);

// Created a new instance of socket.io & provide it the "server" instance / object to listen on
const io = new Server(server);
// connect to the frontend, on every new connection request
connect(io);

// set EJS view Engine
app.set("view engine", "ejs");
// explicitly telling express where my views folder is located, so that it can find the index.ejs file
app.set("views", path.join(import.meta.dirname, "./views"));

// set static folder
app.use(express.static(path.join(import.meta.dirname, "./public")));

app.get("/", (req, res) => {
  res.render(`index`);
});

server.listen(port, host, () => {
  console.log(
    `Server is running on ${
      host === "localhost" ? `http://${host}:${port}` : `https://${host}`
    }`
  );
});
