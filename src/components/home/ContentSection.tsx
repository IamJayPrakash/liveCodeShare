'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ContentSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <div className="prose dark:prose-invert max-w-none space-y-12">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                            Transforming How Developers Collaborate
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            In the fast-paced world of software development, remote collaboration has become the norm rather than the exception.
                            <strong>LiveCodeShare</strong> bridges the gap between physical and digital workspaces by providing a seamless,
                            real-time environment where developers can code together as if they were sitting at the same desk.
                            Our platform eliminates the friction of setting up local environments, sharing screens, or pushing code back and forth via git just to show a snippet.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-foreground">Perfect for Technical Interviews</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Conducting technical interviews remotely can be challenging without the right tools.
                                LiveCodeShare offers a distraction-free environment where interviewers and candidates can write, run, and debug code in real-time.
                                With support for over 50 languages, you can test candidates in their language of choice without any setup overhead.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-foreground">Ideal for Education and Mentorship</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Teaching coding requires immediate feedback. With LiveCodeShare, instructors can see exactly what students are typing as they type it.
                                This instant feedback loop accelerates the learning process, allowing mentors to correct syntax errors or explain logic flaws the moment they occur.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-3xl font-bold mb-6 text-foreground">
                            A Full-Featured Cloud IDE
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                            LiveCodeShare isn't just a text editor; it's a powerful cloud-based IDE.
                            Powered by the same technology that drives VS Code, our Monaco-based editor brings intelligent features to your browser:
                        </p>
                        <ul className="grid md:grid-cols-2 gap-4 text-muted-foreground list-none pl-0">
                            <li className="flex items-start">
                                <span className="mr-2 text-primary">✓</span> Syntax Highlighting for 50+ languages
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-primary">✓</span> Intelligent Code Completion (IntelliSense)
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-primary">✓</span> Smart Auto-formatting
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-primary">✓</span> Multiple Cursors & Keybindings
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-primary">✓</span> Real-time Output Console
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-primary">✓</span> Minimap & Code Folding
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-3xl font-bold mb-6 text-foreground">
                            Why "No-Setup" Matters
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Productivity is often lost in configuration. "It works on my machine" is a phrase every developer dreads.
                            By moving the coding environment to the browser, LiveCodeShare standardizes the execution environment.
                            If code runs here, it runs for everyone. This zero-configuration approach means you can go from an idea to writing code in seconds,
                            not hours.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
