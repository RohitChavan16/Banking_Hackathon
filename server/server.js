import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors({
  origin: [ "http://localhost:5173", 
           "http://localhost:5175"],
  // put your frontend URL here
  methods: ["GET", "POST"],
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let adminSocketId = null;
let connectedUsers = new Map(); // Track all connected users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  connectedUsers.set(socket.id, { socketId: socket.id, isAdmin: false });

  // Admin registers themselves
  socket.on("admin-register", () => {
    adminSocketId = socket.id;
    connectedUsers.set(socket.id, { socketId: socket.id, isAdmin: true });
    console.log("✓ Admin registered with socket id:", adminSocketId);
    console.log("Current connected users:", Array.from(connectedUsers.keys()));
    socket.emit("admin-registered", { success: true, socketId: socket.id });
  });

  // User calls admin
  socket.on("call-user", (data) => {
    console.log("📞 Call request from:", socket.id);
    console.log("📞 Admin socket ID:", adminSocketId);
    console.log("📞 Available sockets:", Array.from(io.sockets.sockets.keys()));
    console.log("📞 Offer data:", data.offer ? "Present" : "Missing");
    
    if (adminSocketId) {
      const adminSocket = io.sockets.sockets.get(adminSocketId);
      if (adminSocket && adminSocket.connected) {
        console.log("✅ Forwarding call to admin:", adminSocketId);
        io.to(adminSocketId).emit("incoming-call", { 
          from: socket.id, 
          offer: data.offer 
        });
        console.log("✅ Call forwarded successfully");
        
        // Send confirmation back to user
        socket.emit("call-sent", { status: "sent", adminId: adminSocketId });
      } else {
        console.log("❌ Admin socket not found or disconnected");
        adminSocketId = null;
        connectedUsers.delete(adminSocketId);
        socket.emit("no-admin", { reason: "Admin disconnected" });
      }
    } else {
      console.log("❌ No admin registered");
      socket.emit("no-admin", { reason: "No admin available" });
    }
  });

  // Admin answers call
  socket.on("answer-call", (data) => {
    console.log("Admin answering call to:", data.to);
    io.to(data.to).emit("call-answered", { answer: data.answer });
  });

  // Admin rejects call
  socket.on("call-rejected", (data) => {
    console.log("Admin rejected call from:", data.to);
    io.to(data.to).emit("call-rejected");
  });

  // ICE candidate exchange
  socket.on("ice-candidate", (data) => {
    console.log("ICE candidate from:", socket.id, "to:", data.to);
    if (data.to) {
      io.to(data.to).emit("ice-candidate", { 
        candidate: data.candidate,
        from: socket.id 
      });
    }
  });

  // Call ended
  socket.on("call-ended", (data) => {
    console.log("Call ended by:", socket.id, "to:", data.to);
    if (data.to) {
      io.to(data.to).emit("call-ended", { from: socket.id });
    }
  });

  // Check admin status
  socket.on("check-admin-status", () => {
    const isAdmin = adminSocketId !== null;
    const adminExists = adminSocketId ? io.sockets.sockets.has(adminSocketId) : false;
    console.log("Admin status check:", { isAdmin, adminExists, adminSocketId });
    socket.emit("admin-status", { 
      adminAvailable: isAdmin && adminExists, 
      adminSocketId: adminSocketId,
      totalUsers: connectedUsers.size
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    connectedUsers.delete(socket.id);
    
    if (socket.id === adminSocketId) {
      adminSocketId = null;
      console.log("❌ Admin disconnected");
      // Notify all users that admin is unavailable
      socket.broadcast.emit("no-admin", { reason: "Admin disconnected" });
    } else {
      // If a regular user disconnects, notify admin if they were in a call
      if (adminSocketId) {
        io.to(adminSocketId).emit("user-disconnected", { userId: socket.id });
      }
    }
    
    console.log("Remaining users:", Array.from(connectedUsers.keys()));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});