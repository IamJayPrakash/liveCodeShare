"use client";

import { createContext, useContext, useEffect } from "react";
import { socket } from "@/lib/socket";

import type { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

import type { ReactNode } from "react";

export function SocketProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    function onConnect() {
      console.log("Socket connected");
    }

    function onDisconnect() {
      console.log("Socket disconnected");
    }

    function onError(error: Error): void {
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