"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileX, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';

export default function NotFound() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="container flex flex-col items-center justify-center flex-1 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 max-w-lg"
        >
          <div className="relative mx-auto w-24 h-24 mb-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <FileX size={96} className="text-destructive" />
            </motion.div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              404 - Room Not Found
            </h1>
            <p className="text-muted-foreground">
              The coding room you&apos;re looking for doesn&apos;t exist or may have expired.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button 
              onClick={() => router.push('/')}
              className="gap-2"
              size="lg"
            >
              <Home size={16} />
              Return Home
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}