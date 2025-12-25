'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { FeatureSection } from '@/components/home/FeatureSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

export default function Home() {
  const [roomInput, setRoomInput] = useState('');
  const router = useRouter();

  const createNewRoom = () => {
    const roomId = uuidv4().substring(0, 8);
    router.push(`/room/${roomId}`);
  };

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomInput.trim()) {
      router.push(`/room/${roomInput.trim()}`);
    }
  };

  return (
    <AppLayout>
      <Header userCount={0} />

      <div className="container flex flex-col items-center justify-center flex-1 py-12 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto">
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
            Collaborate in real-time with others. Edit code, share instantly, and work together
            seamlessly.
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
              <CardDescription>Create a new room or join an existing one</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full gap-2 py-6"
                onClick={createNewRoom}
                size="lg"
                aria-label="Create a new collaboration room"
              >
                <Code size={18} aria-hidden="true" />
                Create a New Room
                <ArrowRight size={16} className="ml-auto" aria-hidden="true" />
              </Button>

              <div className="relative flex items-center py-2" role="separator" aria-hidden="true">
                <div className="flex-grow border-t border-muted"></div>
                <span className="flex-shrink mx-3 text-muted-foreground text-sm">or</span>
                <div className="flex-grow border-t border-muted"></div>
              </div>

              <form onSubmit={joinRoom} className="flex w-full items-center space-x-2">
                <label htmlFor="room-id-input" className="sr-only">
                  Room ID
                </label>
                <Input
                  id="room-id-input"
                  type="text"
                  placeholder="Enter room ID"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value)}
                  className="flex-1"
                  aria-label="Enter room ID to join"
                  aria-required="true"
                />
                <Button
                  type="submit"
                  disabled={!roomInput.trim()}
                  aria-label="Join room"
                >
                  Join
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <FeatureSection />

      <AnimatedBackground title="LiveCodeShare" subtitle="-Collaborate in real-time with others.">
        <div className="py-8">
          <p className="text-center text-lg max-w-2xl mx-auto">
            Experience the future of collaborative coding today.
          </p>
        </div>
      </AnimatedBackground>

      <FAQSection />
      <CallToActionSection />

      <Footer />
    </AppLayout>
  );
}
