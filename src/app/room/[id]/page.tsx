"use client";

import { useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import { Header } from "@/components/Header";
import ShareButton from "@/components/ShareButton";
import { useSocket } from "@/hooks/useSocket";

interface RoomPageClientProps {
  roomId: string;
}

const RoomPageClient = ({ roomId }: RoomPageClientProps) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    
    // Only connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }
    
    socket.emit("join-room", roomId);
    
    return () => {
      // We don't disconnect here, as the socket is managed by the context
      // Just leave the room if needed
    };
  }, [socket, roomId]);

  if (!socket) {
    return <div className="flex items-center justify-center h-screen">Connecting...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header roomId={roomId} userCount={0} />
      <div className="flex items-center justify-between p-2 bg-zinc-900">
        <RoomInfo roomId={roomId} />
        <ShareButton roomId={roomId} />
      </div>
      <div className="flex-1 overflow-hidden">
        <CodeEditor roomId={roomId} />
      </div>
    </div>
  );
};

interface RoomInfoProps {
  roomId: string;
}

const RoomInfo = ({ roomId }: RoomInfoProps) => {
  // Component implementation
  return <div>Room Info for Room ID: {roomId}</div>;
};

export default RoomPageClient;