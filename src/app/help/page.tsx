'use client';

import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function HelpPage() {
  return (
    <AppLayout>
      <Header userCount={0} />
      <AnimatedBackground title="Help" subtitle="-Your guide to using LiveCodeShare">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <p className="text-lg mb-2">
              LiveCodeShare allows you to create a room and share code with others in real-time.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Click Create Room to start a new session.</li>
              <li>Share the room link with your friends or colleagues.</li>
              <li>Collaborate and edit code together live!</li>
            </ul>
          </motion.div>
        </div>
      </main>
      </AnimatedBackground>

      <Footer />
    </AppLayout>
  );
}
