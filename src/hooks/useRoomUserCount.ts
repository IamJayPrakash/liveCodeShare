import { useEffect, useState } from 'react';
import { useSocket } from './useSocket';


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
