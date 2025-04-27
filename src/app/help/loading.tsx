"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export default function Loading() {
  return (
    <AppLayout>
      <div className="container flex flex-col items-center justify-center flex-1 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="inline-flex"
          >
            <Code size={48} className="text-primary" />
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">
              Loading LiveCodeShare...
            </h1>
            <p className="text-muted-foreground">
              Preparing your collaborative coding environment
            </p>
          </div>

          <div className="w-16 h-1 bg-muted rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{
                width: ["0%", "100%", "0%"],
                x: ["0%", "0%", "100%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}