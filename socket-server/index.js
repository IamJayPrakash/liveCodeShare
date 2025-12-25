// socket-server/index.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Track users in rooms
const roomUsers = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // Initialize room if it doesn't exist
    if (!roomUsers[roomId]) {
      roomUsers[roomId] = new Set();
    }

    // Add user to room
    roomUsers[roomId].add(socket.id);

    // Emit to everyone in the room that user joined
    io.in(roomId).emit("user-joined", {
      userId: socket.id
    });

    // Emit current user count to everyone in the room
    io.to(roomId).emit("user-count", roomUsers[roomId].size);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("code-update", code);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    // Find which rooms this user was in
    for (const [roomId, users] of Object.entries(roomUsers)) {
      if (users.has(socket.id)) {
        users.delete(socket.id);

        // Emit to others that user left
        socket.to(roomId).emit("user-left", socket.id);

        // Emit updated user count
        io.to(roomId).emit("user-count", users.size);

        // Clean up empty rooms
        if (users.size === 0) {
          delete roomUsers[roomId];
        }
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Socket server running on http://localhost:3001");
});

export default app;
