// socket-server/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // Define allowed origins more specifically in production
    origin: process.env.NODE_ENV === "production" 
      ? ["https://livecodeshare.vercel.app"] 
      : ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  },
  pingTimeout: 60000,
});

// Add a basic route to check if server is running
app.get('/', (req, res) => {
  res.send('Socket.io server is running');
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    
    // Notify others in the room
    socket.to(roomId).emit("user-joined", socket.id);
    
    // Get current users in room
    const clients = io.sockets.adapter.rooms.get(roomId);
    const numClients = clients ? clients.size : 0;
    io.to(roomId).emit("room-users", numClients);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    // You could also emit a user-left event here if needed
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket server running on http://localhost:${PORT}`);
});

export default app;