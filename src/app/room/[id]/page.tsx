"use client";

import React, { useEffect, useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import { UsersList } from '@/components/collaboration/UsersList';
import { UserCursor } from '@/components/collaboration/UserCursor';
import { useCollaboration } from '@/hooks/useCollaboration';
import { socket } from '@/lib/socket';
import { toast } from '@/components/ui/use-toast';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = React.use(params); // Unwrap the params object
  const { users, currentUser, cursors } = useCollaboration(roomId);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
      toast({
        title: "Connected!",
        description: "You are now connected to the room",
      });
    };

    const onDisconnect = () => {
      setConnected(false);
      toast({
        title: "Disconnected",
        description: "Lost connection to the server",
        variant: "destructive",
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    if (socket.connected) {
      setConnected(true);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <AppLayout>
      <Header roomId={roomId} userCount={users.length} />
      <CodeEditor roomId={roomId} />
      
      {/* User collaboration UI */}
      <UsersList users={users} />
      
      {/* Render other users' cursors */}
      {Object.entries(cursors).map(([userId, position]) => {
        const user = users.find(u => u.id === userId);
        if (!user || user.id === currentUser?.id) return null;
        return <UserCursor key={userId} user={user} position={position} />;
      })}
      
      {/* Connection status indicator */}
      <div className={`fixed bottom-6 right-6 h-3 w-3 rounded-full transition-colors ${connected ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}>
        <span className="sr-only">{connected ? 'Connected' : 'Disconnected'}</span>
        <span className="absolute -inset-0.5 rounded-full animate-ping opacity-75 bg-current" />
      </div>
    </AppLayout>
  );
}