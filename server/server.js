import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let adminSocketId = null;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("register-admin", () => {
    adminSocketId = socket.id;
    console.log("Admin registered with socket ID:", adminSocketId);
  });

  socket.on("call-admin", (data) => {
    // data = { offer, from }
    if (adminSocketId) {
      io.to(adminSocketId).emit("incoming-call", { offer: data.offer, from: data.from });
    } else {
      io.to(data.from).emit("no-admin");
    }
  });

  socket.on("answer-call", (data) => {
    // data = { answer, to }
    io.to(data.to).emit("call-accepted", { answer: data.answer });
  });

  socket.on("reject-call", (data) => {
    // data = { to }
    io.to(data.to).emit("call-rejected");
  });

  socket.on("ice-candidate", (data) => {
    // data = { candidate, to }
    io.to(data.to).emit("ice-candidate", { candidate: data.candidate });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    if (socket.id === adminSocketId) {
      adminSocketId = null;
      console.log("Admin disconnected");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
