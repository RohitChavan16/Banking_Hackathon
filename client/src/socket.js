import { io } from "socket.io-client";

const socket = io("https://banking-hackathon.onrender.com", {
  transports: ["websocket"], // force WebSocket on Render
});

export default socket;
