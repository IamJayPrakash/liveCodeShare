'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, Globe, Shield, Coffee } from 'lucide-react';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function AboutClient() {
    return (
        <AppLayout>
            <Header userCount={0} />
            <AnimatedBackground title="About Us" subtitle="LiveCodeShare" >
                <div className="mt-4">
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                        Our mission is to make collaborative coding accessible and seamless.
                    </p>
                </div>
            </AnimatedBackground>

            <main className="flex-1">
                <div className="container py-12 md:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mx-auto max-w-3xl space-y-8"
                    >
                        <div className="text-center space-y-3">
                            {/* <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About LiveCodeShare</h1> */}

                        </div>

                        <div className="prose dark:prose-invert mx-auto max-w-3xl space-y-8">
                            <div className="space-y-6">
                                <p className="leading-relaxed text-lg">
                                    LiveCodeShare began with a simple idea: coding is better when done together. Whether
                                    you&apos;re pair programming with a colleague, teaching a student, or just getting
                                    help from a friend, having a space where you can code in real-time makes development
                                    more efficient and enjoyable.
                                </p>

                                <p className="leading-relaxed text-lg">
                                    Our platform allows developers to share code instantly without the need for
                                    complicated setups or software installations. Just create a room, share the link,
                                    and start collaborating right away.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    Our Team
                                </h2>
                                <p className="leading-relaxed">
                                    We&apos;re a small team of developers who are passionate about creating tools that
                                    make coding more collaborative. Our backgrounds span from web development to
                                    educational technology, bringing diverse perspectives to how we build LiveCodeShare.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    How It Works
                                </h2>
                                <p className="leading-relaxed">
                                    LiveCodeShare uses WebSockets to enable real-time code synchronization across
                                    multiple devices. Changes are transmitted instantly, allowing all participants to
                                    see updates as they happen. Our editor supports syntax highlighting for dozens of
                                    programming languages, making it suitable for projects of all types.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    Privacy and Security
                                </h2>
                                <p className="leading-relaxed">
                                    We understand the importance of keeping your code private. LiveCodeShare rooms are
                                    accessible only to those with the specific room ID, and we don&apos;t store your
                                    code on our servers longer than necessary for the collaboration session.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    Open Source
                                </h2>
                                <p className="leading-relaxed">
                                    We believe in the power of community-driven development. That&apos;s why
                                    LiveCodeShare is open source, allowing developers to contribute to its improvement
                                    and customize it for their specific needs.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-semibold">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Coffee className="h-6 w-6 text-primary" />
                                    </div>
                                    Support Us
                                </h2>
                                <p className="leading-relaxed">
                                    LiveCodeShare is offered free of charge, but maintaining and improving the platform
                                    requires resources. If you find the tool valuable, consider supporting us through
                                    GitHub sponsors or by contributing code improvements.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </AppLayout>
    );
}
