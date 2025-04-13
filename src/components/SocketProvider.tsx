// src/components/SocketProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { socket } from "@/lib/socket";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};
