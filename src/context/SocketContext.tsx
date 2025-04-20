"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/lib/socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      console.log("Socket connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("Socket disconnected");
      setIsConnected(false);
    }

    function onError(error) {
      console.error("Socket error:", error);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}