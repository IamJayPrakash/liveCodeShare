import { useContext } from 'react';
import { SocketContext } from '@/context/SocketContext';

/**
 * Custom hook to access the Socket.IO instance.
 * 
 * Provides access to the globally shared socket connection from the SocketContext.
 * Ensures that components consume the same socket instance for consistent state.
 * 
 * @returns {import("socket.io-client").Socket | null} The socket instance or null if not connected/initialized.
 * @throws {Error} If used outside of SocketProvider (though implementation just returns context).
 */
export const useSocket = () => {
  return useContext(SocketContext);
};
