"use client"; // Add this at the top

import React, { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

const SocketContext = createContext<Socket | null>(null);

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:3001';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, { autoConnect: false });
    console.log("Socket initialized:", socketInstance);
    setSocket(socketInstance);

    socketInstance.on('user-joined', (userId) => {
      toast.success(`${userId} has joined the room!`);
    });

    return () => {
      socketInstance.disconnect();
      socketInstance.off('user-joined');
    };
  }, []);

  
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
