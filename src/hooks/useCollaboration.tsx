import { useState, useEffect } from 'react';
import { socket } from '@/lib/socket';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export function useCollaboration(roomId) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [cursors, setCursors] = useState({});
  
  useEffect(() => {
    if (!roomId) return;
    
    // Create current user on mount
    const userId = uuidv4();
    const newUser = {
      id: userId,
      name: faker.person.firstName() + ' ' + faker.person.lastName().charAt(0),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
      color: faker.color.rgb({ format: 'hex', casing: 'lower' }),
      active: true,
    };
    
    setCurrentUser(newUser);
    
    // Join room with user info
    socket.emit('join-room', { roomId, user: newUser });
    
    // Listen for user events
    socket.on('users-update', (updatedUsers) => {
      setUsers(updatedUsers);
    });
    
    socket.on('cursor-move', ({ userId, position }) => {
      setCursors(prev => ({ ...prev, [userId]: position }));
    });
    
    // Mouse move handler to broadcast cursor position
    const handleMouseMove = (event) => {
      const position = { x: event.clientX, y: event.clientY };
      socket.emit('cursor-update', { roomId, userId: newUser.id, position });
    };
    
    // Throttled event listener
    let lastEmitTime = 0;
    const throttleTime = 50; // ms
    
    const throttledMouseMove = (event) => {
      const now = Date.now();
      if (now - lastEmitTime > throttleTime) {
        handleMouseMove(event);
        lastEmitTime = now;
      }
    };
    
    window.addEventListener('mousemove', throttledMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      socket.emit('leave-room', { roomId, userId: newUser.id });
      socket.off('users-update');
      socket.off('cursor-move');
    };
  }, [roomId]);
  
  return { users, currentUser, cursors };
}