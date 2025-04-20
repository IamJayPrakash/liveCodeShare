"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Globe, Users } from 'lucide-react';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
  const [roomInput, setRoomInput] = useState('');
  const router = useRouter();

  const createNewRoom = () => {
    const roomId = uuidv4().substring(0, 8);
    router.push(`/room/${roomId}`);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomInput.trim()) {
      router.push(`/room/${roomInput.trim()}`);
    }
  };

  return (
    <AppLayout>
      <Header />
      
      <div className="container flex flex-col items-center justify-center flex-1 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Live<span className="text-primary">Code</span>Share
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Collaborate in real-time with others. Edit code, share instantly, and work together seamlessly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Start Collaborating</CardTitle>
              <CardDescription>
                Create a new room or join an existing one
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full gap-2 py-6" 
                onClick={createNewRoom}
                size="lg"
              >
                <Code size={18} />
                Create a New Room
                <ArrowRight size={16} className="ml-auto" />
              </Button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-muted"></div>
                <span className="flex-shrink mx-3 text-muted-foreground text-sm">or</span>
                <div className="flex-grow border-t border-muted"></div>
              </div>
              
              <form onSubmit={joinRoom} className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter room ID"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={!roomInput.trim()}>
                  Join
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl"
        >
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-primary" />
                Real-time Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See changes instantly as people type. Multiple users can work on the same file together.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-primary" />
                Multiple Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support for JavaScript, Python, HTML, CSS, and many other programming languages.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Easy Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Just share the room ID or URL with your team to start collaborating instantly.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}
