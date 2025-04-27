'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Zap, Globe, Shield, Coffee } from 'lucide-react';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <AppLayout>
      <Header userCount={0} />

      <main className="flex-1">
        <div className="container py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About LiveCodeShare</h1>
              <p className="text-xl text-muted-foreground">
                Our mission is to make collaborative coding accessible and seamless.
              </p>
            </div>

            <div className="prose dark:prose-invert mx-auto max-w-3xl">
              <p>
                LiveCodeShare began with a simple idea: coding is better when done together. Whether
                you&apos;re pair programming with a colleague, teaching a student, or just getting
                help from a friend, having a space where you can code in real-time makes development
                more efficient and enjoyable.
              </p>

              <p>
                Our platform allows developers to share code instantly without the need for
                complicated setups or software installations. Just create a room, share the link,
                and start collaborating right away.
              </p>

              <h2 className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Our Team
              </h2>
              <p>
                We&apos;re a small team of developers who are passionate about creating tools that
                make coding more collaborative. Our backgrounds span from web development to
                educational technology, bringing diverse perspectives to how we build LiveCodeShare.
              </p>

              <h2 className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                How It Works
              </h2>
              <p>
                LiveCodeShare uses WebSockets to enable real-time code synchronization across
                multiple devices. Changes are transmitted instantly, allowing all participants to
                see updates as they happen. Our editor supports syntax highlighting for dozens of
                programming languages, making it suitable for projects of all types.
              </p>

              <h2 className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Privacy and Security
              </h2>
              <p>
                We understand the importance of keeping your code private. LiveCodeShare rooms are
                accessible only to those with the specific room ID, and we don&apos;t store your
                code on our servers longer than necessary for the collaboration session.
              </p>

              <h2 className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <Code size={18} className="h-6 w-6 text-primary" />
                Open Source
              </h2>
              <p>
                We believe in the power of community-driven development. That&apos;s why
                LiveCodeShare is open source, allowing developers to contribute to its improvement
                and customize it for their specific needs.
              </p>

              <h2 className="flex items-center gap-2">
                <Coffee className="h-6 w-6 text-primary" />
                Support Us
              </h2>
              <p>
                LiveCodeShare is offered free of charge, but maintaining and improving the platform
                requires resources. If you find the tool valuable, consider supporting us through
                GitHub sponsors or by contributing code improvements.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </AppLayout>
  );
}
