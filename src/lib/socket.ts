import { io } from "socket.io-client";

// Create a socket instance
export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3001", {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
