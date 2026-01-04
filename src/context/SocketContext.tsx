"use client";

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

const SocketContext = createContext<Socket | null>(null);

// Default to localhost in development, should be overridden in production
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

/**
 * SocketProvider Component
 * 
 * Manages the singleton Socket.IO connection for the application.
 * Initializes the socket on mount and provides it via context.
 * Handles extensive connection error logging and toast notifications.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    try {
      // Initialize Socket.IO client with robust reconnection policies
      const socketInstance = io(SOCKET_URL, {
        autoConnect: false,     // Manual connection control (handled by components)
        reconnectionAttempts: 5, // Try 5 times before giving up
        reconnectionDelay: 1000, // Wait 1s between attempts
        timeout: 20000,          // 20s connection timeout
      });

      setSocket(socketInstance);

      // Set up global event listeners
      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
        toast.error(`Connection error: ${err.message}`);
      });

      // Cleanup on unmount
      return () => {
        socketInstance.disconnect();
        socketInstance.off("connect");
        socketInstance.off("connect_error");
      };
    } catch (error) {
      console.error("Socket initialization error:", error);
      toast.error("Failed to initialize socket connection");
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext };