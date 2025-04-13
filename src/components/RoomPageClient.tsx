"use client";

import { useEffect } from "react";
import CodeEditor from "@/components/CodeEditor";
import { Header } from "@/components/Header";
import RoomInfo from "@/components/RoomInfo";
import ShareButton from "@/components/ShareButton";
import { useSocket } from "@/hooks/useSocket";
import UserAvatar from "./UserAvatar";

interface RoomPageClientProps {
  roomId: string;
}

const RoomPageClient = ({ roomId }: RoomPageClientProps) => {
  const socket = useSocket();

  useEffect(() => {
    console.log("Socket in RoomPageClient:", socket); // ✅ Add this
    if (socket && roomId) {
      socket.connect();
      socket.emit("join-room", roomId);
    }
  }, [socket, roomId]);
  

  return (
    <div className="flex flex-col h-screen">
      <Header roomId={roomId} />
      <RoomInfo />
      <UserAvatar />
      <UserAvatar />
      <ShareButton roomId={roomId} />
      <CodeEditor roomId={roomId} />
    </div>
  );
};

export default RoomPageClient;