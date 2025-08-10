import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://banking-hackathon-2.onrender.com", // put your frontend URL here
  methods: ["GET", "POST"],
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://banking-hackathon-2.onrender.com",
    methods: ["GET", "POST"],
  },
});

let adminSocketId = null;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("admin-register", () => {
    adminSocketId = socket.id;
    console.log("Admin registered with socket id:", adminSocketId);
  });

  socket.on("call-user", (data) => {
    if (adminSocketId) {
      io.to(adminSocketId).emit("incoming-call", { from: socket.id, offer: data.offer });
    } else {
      socket.emit("no-admin");
    }
  });

  socket.on("answer-call", (data) => {
    io.to(data.to).emit("call-answered", { answer: data.answer });
  });

  socket.on("call-rejected", (data) => {
    io.to(data.to).emit("call-rejected");
  });

  socket.on("ice-candidate", (data) => {
    io.to(data.to).emit("ice-candidate", { candidate: data.candidate });
  });

  socket.on("call-ended", (data) => {
    io.to(data.to).emit("call-ended");
  });

  socket.on("disconnect", () => {
    if (socket.id === adminSocketId) {
      adminSocketId = null;
      console.log("Admin disconnected");
      // Optionally notify all users no admin is available:
      io.emit("no-admin");
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
