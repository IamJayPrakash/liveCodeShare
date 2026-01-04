'use client';

import React from 'react';
import CodeEditor from '@/components/CodeEditor';
import { Header } from '@/components/Header';
import { useSocket } from '@/hooks/useSocket';
import { useRoomUserCount } from '@/hooks/useRoomUserCount';
import { Loader2 } from 'lucide-react';

/**
 * Props interface for RoomPageClient
 */
interface RoomPageClientProps {
  /** Unique identifier for the collaboration room */
  roomId: string;
}

/**
 * RoomPageClient Component
 * 
 * Client-side component for the collaborative coding room.
 * Handles the visual layout of the room, including the header and the editor.
 * 
 * Features:
 * - Displays loading screen until socket connection is established
 * - Renders the Room Header with participant count
 * - Renders the main CodeEditor
 * 
 * @component
 * @param {RoomPageClientProps} props - Component props
 * @returns {JSX.Element} The fully rendered room page
 */
export default function RoomPageClient({ roomId }: RoomPageClientProps) {
  // Access the global socket instance
  const socket = useSocket();

  // Custom hook to track real-time user count in this room
  const { userCount } = useRoomUserCount();

  // 1. Loading State: Wait for socket connection
  // This ensures we don't render the editor until we have a valid connection backbone.
  // The 'fixed inset-0' ensures the loader is perfectly centered on the screen.
  if (!socket) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-background z-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Connecting to live session...</p>
      </div>
    );
  }

  // 2. Main Render: Header + Editor
  // Uses a flex column layout to ensure the header sits at the top and editor fills the rest.
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Room Header: Shows room ID, logo, and active user count */}
      <Header roomId={roomId} userCount={userCount} />

      {/* Main Content Area: Fills remaining height */}
      <main className="flex-1 relative w-full overflow-hidden">
        <CodeEditor roomId={roomId} />
      </main>
    </div>
  );
}
