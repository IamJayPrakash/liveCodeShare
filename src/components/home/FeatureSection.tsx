'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Monitor, Code2, Users2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
    {
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        title: 'Instant Real-time Sync',
        description:
            'Experience zero-latency collaboration. Every keystroke is synced instantly across all connected devices using advanced WebSocket technology.',
    },
    {
        icon: <Code2 className="h-6 w-6 text-blue-500" />,
        title: 'Multi-Language Support',
        description:
            'Write in your favorite language. We support syntax highlighting and intelligent formatting for JavaScript, Python, Java, C++, and 50+ others.',
    },
    {
        icon: <Users2 className="h-6 w-6 text-green-500" />,
        title: 'Unlimited Collaborators',
        description:
            'Whether it is a pair programming session or a classroom workshop, invite as many people as you need to your room via a simple link.',
    },
    {
        icon: <Monitor className="h-6 w-6 text-purple-500" />,
        title: 'Monaco Editor Integrated',
        description:
            'Enjoy the power of VS Code in your browser. Our editor is powered by Monaco, offering familiar shortcuts, multicursor support, and minimaps.',
    },
    {
        icon: <Shield className="h-6 w-6 text-red-500" />,
        title: 'Secure & Private',
        description:
            'Your privacy matters. Rooms are private by default—only people with the unique room ID can join. We do not store your code permanently.',
    },
    {
        icon: <Globe className="h-6 w-6 text-cyan-500" />,
        title: 'Browser Based',
        description:
            'No downloads, no installations. LiveCodeShare runs entirely in your browser, making it accessible from any device, anywhere in the world.',
    },
];

export function FeatureSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        Why Choose LiveCodeShare?
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed to make collaborative coding effortless and productive.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-muted/60 transition-colors hover:border-primary/50 hover:bg-muted/20">
                                <CardHeader>
                                    <div className="mb-2 p-3 w-fit rounded-lg bg-background border shadow-sm">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
