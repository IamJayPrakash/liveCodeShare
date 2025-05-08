'use client';

import { useEffect } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { Header } from '@/components/Header';
import { useSocket } from '@/hooks/useSocket';
import { useRoomUserCount } from '@/hooks/useRoomUserCount';
import { toast } from 'sonner';

interface RoomPageClientProps {
  roomId: string;
}

const RoomPageClient = ({ roomId }: RoomPageClientProps) => {
  const socket = useSocket();
  const { userCount } = useRoomUserCount();

  useEffect(() => {
    if (!socket) return;

    // Only connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join-room', roomId);

    socket.on('user-joined', () => {
      toast.success(`A new user has joined your room ${roomId}`);
    });

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
      <Header roomId={roomId} userCount={userCount} />

      <div className="flex-1 overflow-hidden">
        <CodeEditor roomId={roomId} />
      </div>
    </div>
  );
};

export default RoomPageClient;
