import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: string;
  name: string;
  avatar: string;
  active: boolean;
}

export function UsersList({ users = [] }: { users: User[] }) {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="rounded-full bg-card p-1.5 border shadow-lg">
        <div className="flex items-center -space-x-2">
          <TooltipProvider delayDuration={300}>
            <AnimatePresence>
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`relative cursor-pointer`}>
                        <Avatar className="border-2 border-background h-10 w-10">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${user.active ? 'bg-green-500' : 'bg-yellow-500'} ring-2 ring-white`}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-medium">
                      {user.name}
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </AnimatePresence>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
