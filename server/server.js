import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173", // local testing
      "https://banking-hackathon-2.onrender.com" // deployed frontend
    ],
    methods: ["GET", "POST"]
  },
});

let adminSocketId = null;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("register-admin", () => {
    adminSocketId = socket.id;
    console.log("Admin registered with socket ID:", adminSocketId);
  });

  socket.on("call-admin", ({ offer, from }) => {
    if (adminSocketId) {
      io.to(adminSocketId).emit("incoming-call", { offer, from });
    } else {
      io.to(from).emit("no-admin");
    }
  });

  socket.on("answer-call", ({ answer, to }) => {
    io.to(to).emit("call-accepted", { answer });
  });

  socket.on("reject-call", ({ to }) => {
    io.to(to).emit("call-rejected");
  });

  socket.on("ice-candidate", ({ candidate, to }) => {
    io.to(to).emit("ice-candidate", { candidate });
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
