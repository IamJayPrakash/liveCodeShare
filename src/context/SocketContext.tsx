"use client";

import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

const SocketContext = createContext<Socket | null>(null);

// Default to localhost in development, should be overridden in production
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    try {
      const socketInstance = io(SOCKET_URL, { 
        autoConnect: false,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      setSocket(socketInstance);

      // Set up event listeners
      socketInstance.on("connect", () => {
        console.log("Socket connected:", socketInstance.id);
      });

      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
        toast.error(`Connection error: ${err.message}`);
      });

      socketInstance.on("user-joined", (userId) => {
        toast.success(`${userId} has joined the room!`);
      });

      return () => {
        socketInstance.disconnect();
        socketInstance.off("connect");
        socketInstance.off("connect_error");
        socketInstance.off("user-joined");
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