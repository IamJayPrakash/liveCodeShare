import { useSocket } from '@/hooks/useSocket';
import { useState, useEffect } from 'react';

const RoomInfo = () => {
  const [userCount, setUserCount] = useState(0);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Listen for direct user count updates
    socket.on('user-count', (count: number) => {
      setUserCount(count);
    });

    return () => {
      socket.off('user-count');
    };
  }, [socket]);

  return (
    <div className="room-info p-2 text-sm bg-gray-800 border-b border-gray-700">
      <p className="text-gray-400">
        {userCount === 1 ? "You're the only one here" : `${userCount} people in this room`}
      </p>
    </div>
  );
};

export default RoomInfo;
