import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';


/**
 * Custom hook to track the number of active users in the current room.
 * 
 * listens for 'user-count' events from the socket server.
 * 
 * @returns {Object} object containing the current user count
 * @property {number} userCount - The number of connected users
 */
export function useRoomUserCount() {
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

   return { userCount };
}
