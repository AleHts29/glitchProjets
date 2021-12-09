const express = require("express");
const app = express();

// Archivos estaticos
app.use(express.static(__dirname + "/public"));

// Modulo Nativo HTTP
const http = require("http");
const server = http.createServer(app);
const router = require("./routes/index");

const port = process.env.PORT || 8090;

let msn = [];

// Socket
const { Server } = require("socket.io");
const io = new Server(server);

// Conexion Socket
io.on("connection", (socket) => {
  console.log("cliente conectado");

  socket.on("message_client", (data) => {
    console.log(data);
  });

  // escuchar chat cliente
  socket.on("dataMns", (data) => {
    msn.push(data);
    console.log(msn);
    // le responde al cliente con informacion actualizada
    // socket.emit("message_back", msn);

    // Coneccion Chat con socket
    io.sockets.emit("message_back", msn);
  });
});

// Router
app.use("/api", router);

server.listen(port, (req, res) => {
  console.log("🚀 Server run on port " + port);
});
