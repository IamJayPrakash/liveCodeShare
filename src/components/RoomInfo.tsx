import { useSocket } from '@/hooks/useSocket';
import { useState, useEffect } from 'react';

const RoomInfo = () => {
  const [userCount, setUserCount] = useState(0);
  const socket = useSocket(); // Use the socket from context

  useEffect(() => {
    if (!socket) return;
  
    socket.on('user-joined', () => {
      setUserCount((prevCount) => prevCount + 1);
    });
  
    socket.on('user-left', () => {
      setUserCount((prevCount) => prevCount - 1);
    });
  
    return () => {
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, [socket]);
  

  return (
    <div className="room-info">
      <p className="text-sm text-gray-400">People in this room: {userCount}</p>
    </div>
  );
};

export default RoomInfo;