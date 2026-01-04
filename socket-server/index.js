/**
 * LiveCodeShare - WebSocket Server
 * 
 * Real-time collaboration server for the LiveCodeShare platform.
 * Handles WebSocket connections, room management, and message broadcasting.
 * 
 * Features:
 * - Real-time code synchronization across multiple users
 * - Room-based collaboration (isolated workspaces)
 * - Automatic room cleanup when empty
 * - Health monitoring endpoint
 * - Production-ready optimizations
 * 
 * Technology Stack:
 * - Express.js: HTTP server
 * - Socket.IO: WebSocket library
 * - CORS: Cross-origin resource sharing
 * 
 * @module socket-server
 * @requires express
 * @requires socket.io
 * @requires cors
 */

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// ===== EXPRESS APP SETUP =====
const app = express();
app.use(cors());

/**
 * Health Check Endpoint
 * 
 * Provides server health status and metrics.
 * Useful for monitoring, load balancers, and debugging.
 * 
 * @route GET /health
 * @returns {Object} Health status with metrics
 * @example
 * {
 *   status: 'healthy',
 *   uptime: 12345.67,
 *   timestamp: '2024-01-04T10:00:00.000Z',
 *   activeRooms: 5,
 *   totalConnections: 12
 * }
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    activeRooms: Object.keys(roomUsers).length,
    totalConnections: io.engine.clientsCount
  });
});

// ===== HTTP & SOCKET.IO SERVER SETUP =====
const server = http.createServer(app);

/**
 * Socket.IO Server Configuration
 * 
 * Optimized for production use with:
 * - CORS enabled for all origins (configure for production)
 * - WebSocket-first transport (faster)
 * - Polling fallback for compatibility
 * - Connection timeouts to prevent zombie connections
 * - Message size limits to prevent abuse
 */
const io = new Server(server, {
  cors: {
    origin: "*", // TODO: Configure specific origins in production
    methods: ["GET", "POST"],
  },
  // Production optimizations:
  // - Close connection after 60s of inactivity
  pingTimeout: 60000,
  // - Send ping every 25s
  pingInterval: 25000,
  // - 1MB Max payload
  maxHttpBufferSize: 1e6,
  // - WebSocket transport preferred
  transports: ['websocket', 'polling'],
  // - Enable compression (saves bandwidth)
  httpCompression: true,
  perMessageDeflate: {
    threshold: 1024, // Only compress data > 1KB
  },
});

// ===== STATE MANAGEMENT =====

/** 
 * Map tracking active sockets in each room.
 * @type {Object.<string, Set<string>>} 
 */
const roomUsers = {};

/** 
 * Map storing current code/language state for rooms.
 * @type {Object.<string, {code: string, language: string}>} 
 */
const roomState = {};

/**
 * Map tracking cleanup timers for empty rooms.
 * Prevents immediate destruction on page refresh.
 * @type {Object.<string, NodeJS.Timeout>}
 */
const roomCleanupTimers = {};

// Clean up room after 10 seconds of being empty
const ROOM_CLEANUP_DELAY = 10000;

// ===== SOCKET EVENT HANDLERS =====

/**
 * Connection Event Handler
 * 
 * Fired when a new client connects to the server.
 * Sets up event listeners for this specific socket.
 */
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  /**
   * JOIN ROOM Event
   * 
   * Handles user joining a collaboration room.
   * 
   * Actions:
   * 1. Add socket to Socket.IO room
   * 2. Initialize room state if new
   * 3. Track user in roomUsers map
   * 4. Send current room state to joining user
   * 5. Notify other users of new join
   * 6. Broadcast updated user count
   * 
   * @event join-room
   * @param {string} roomId - Unique room identifier
   */
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // Cancel pending cleanup if room was marked for deletion
    if (roomCleanupTimers[roomId]) {
      clearTimeout(roomCleanupTimers[roomId]);
      delete roomCleanupTimers[roomId];
      console.log(`Room ${roomId} cleanup cancelled (user joined)`);
    }

    // Initialize room if it doesn't exist
    if (!roomUsers[roomId]) {
      roomUsers[roomId] = new Set();
      if (!roomState[roomId]) {
        roomState[roomId] = { code: '', language: 'javascript' };
      }
    }

    // Add user to room tracking
    roomUsers[roomId].add(socket.id);

    // Send current room state to the newly joined user ONLY
    socket.emit("room-state", roomState[roomId]);

    // Notify OTHER users that this user joined (excludes sender)
    socket.to(roomId).emit("user-joined", {
      userId: socket.id
    });

    // Broadcast updated user count to ALL users in room (includes sender)
    io.to(roomId).emit("user-count", roomUsers[roomId].size);
  });

  /**
   * LEAVE ROOM Event
   * 
   * Handles user explicitly leaving a room.
   */
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);

    // Remove user from room tracking
    if (roomUsers[roomId]) {
      roomUsers[roomId].delete(socket.id);

      // Notify others that user left
      socket.to(roomId).emit("user-left", socket.id);

      // Broadcast updated user count
      io.to(roomId).emit("user-count", roomUsers[roomId].size);

      // Check if room is empty
      if (roomUsers[roomId].size === 0) {
        // Schedule cleanup instead of deleting immediately
        console.log(`Room ${roomId} is empty. Scheduling cleanup in ${ROOM_CLEANUP_DELAY}ms...`);
        roomCleanupTimers[roomId] = setTimeout(() => {
          if (roomUsers[roomId] && roomUsers[roomId].size === 0) {
            delete roomUsers[roomId];
            delete roomState[roomId];
            delete roomCleanupTimers[roomId];
            console.log(`Room ${roomId} cleaned up (inactive)`);
          }
        }, ROOM_CLEANUP_DELAY);
      }
    }
  });

  /**
   * CODE CHANGE Event
   */
  socket.on("code-change", ({ roomId, code }) => {
    // Update room state for persistence
    if (roomState[roomId]) {
      roomState[roomId].code = code;
    }

    // Broadcast to others only (not back to sender)
    socket.to(roomId).emit("code-update", code);
  });

  /**
   * LANGUAGE CHANGE Event
   */
  socket.on("language-change", ({ roomId, language }) => {
    // Update room state
    if (roomState[roomId]) {
      roomState[roomId].language = language;
    }

    // Broadcast to others only
    socket.to(roomId).emit("language-update", language);
  });

  /**
   * DISCONNECT Event
   */
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);

    // Check all rooms this user was in
    for (const [roomId, users] of Object.entries(roomUsers)) {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        socket.to(roomId).emit("user-left", socket.id);
        io.to(roomId).emit("user-count", users.size);

        if (users.size === 0) {
          console.log(`Room ${roomId} is empty. Scheduling cleanup in ${ROOM_CLEANUP_DELAY}ms...`);
          roomCleanupTimers[roomId] = setTimeout(() => {
            if (roomUsers[roomId] && roomUsers[roomId].size === 0) {
              delete roomUsers[roomId];
              delete roomState[roomId];
              delete roomCleanupTimers[roomId];
              console.log(`Room ${roomId} cleaned up (inactive)`);
            }
          }, ROOM_CLEANUP_DELAY);
        }
      }
    }
  });

  /**
   * ERROR Event
   */
  socket.on("error", (error) => {
    console.error(`Socket error for ${socket.id}:`, error);
  });
});

// ===== GRACEFUL SHUTDOWN =====

/**
 * SIGTERM Handler
 * 
 * Handles graceful shutdown on process termination.
 * Ensures all connections are closed properly.
 * 
 * Important for:
 * - Zero-downtime deployments
 * - Preventing data loss
 * - Clean resource cleanup
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

// ===== SERVER START =====

/**
 * Start the server
 * 
 * Listens on PORT environment variable or 3001 by default.
 * Logs startup message with server URL.
 */
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Socket server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

export default app;
