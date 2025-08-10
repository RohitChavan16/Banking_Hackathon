// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors({ origin: "*" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

let adminSocketId = null;

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("admin-register", () => {
    adminSocketId = socket.id;
    console.log("Admin registered:", adminSocketId);
  });

  socket.on("call-user", ({ offer }) => {
    if (adminSocketId) {
      console.log(`User ${socket.id} calls Admin ${adminSocketId}`);
      io.to(adminSocketId).emit("incoming-call", { from: socket.id, offer });
    } else {
      socket.emit("no-admin");
    }
  });

  socket.on("answer-call", ({ to, answer }) => {
    console.log(`Admin ${socket.id} answers User ${to}`);
    io.to(to).emit("call-answered", { answer });
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", { candidate });
  });

  socket.on("disconnect", () => {
    if (socket.id === adminSocketId) {
      adminSocketId = null;
      console.log("Admin disconnected");
    }
    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
