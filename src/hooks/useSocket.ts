import { useEffect } from 'react';
import { socket } from '@/lib/socket';

export function useSocket() {
  useEffect(() => {
    socket.on('connect', () => {});
    socket.on('disconnect', () => {});

    return () => {
      socket.off('connect', () => {});
      socket.off('disconnect', () => {});
    };
  }, []);

  return socket;
}
