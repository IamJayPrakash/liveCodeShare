'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'What is LiveCodeShare?',
        answer: 'LiveCodeShare is a real-time collaborative code editor that allows developers to share and edit code together instantly. It features multi-language support, live synchronization, and a clean, modern interface powered by the Monaco Editor.',
    },
    {
        question: 'Is LiveCodeShare free to use?',
        answer: 'Yes! LiveCodeShare is 100% free. You can create as many rooms as you like and invite unlimited collaborators without any hidden costs or subscription plans.',
    },
    {
        question: 'Do I need to create an account?',
        answer: 'No signup is required. You can start a live coding session immediately by clicking "Create a New Room". We value your time and privacy.',
    },
    {
        question: 'Which programming languages are supported?',
        answer: 'Our platform functions as an all-in-one online js compiler, online c compiler, online python compiler, and more. We support over 50 languages with syntax highlighting and intelligent suggestions.',
    },
    {
        question: 'How many people can join a room?',
        answer: 'While there is no hard limit, the experience is optimized for 2-10 active collaborators. This makes it perfect for pair programming, technical interviews, and classroom teaching.',
    },
    {
        question: 'Is my code secure and private?',
        answer: 'Absolutely. Rooms are protected by unique IDs. We do not store your code permanently on our servers; it exists only during the active collaboration session.',
    },
    {
        question: 'Can I use it for technical interviews?',
        answer: 'Yes! Many companies use LiveCodeShare for remote technical assessments. The real-time nature of the platform allows interviewers to see the candidate\'s thought process and coding style live.',
    },
    {
        question: 'Does it work on mobile?',
        answer: 'Yes, LiveCodeShare is fully responsive. You can view, review, and even edit code on your smartphone or tablet, though the experience is best on desktop for heavy coding.',
    }
];

export default function FAQClient() {
    return (
        <AppLayout>
            <Header userCount={0} />
            <AnimatedBackground title="FAQ" subtitle="Common Questions" >
                <div className="mt-4">
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                        Everything you need to know about our online code sharing platform.
                    </p>
                </div>
            </AnimatedBackground>

            <main className="flex-1 bg-background">
                <div className="container mx-auto py-16 md:py-24 max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-12"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-foreground">
                                Detailed Answers
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Can&apos;t find what you&apos;re looking for? Reach out to us on our contact page.
                            </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border rounded-xl px-6 bg-card hover:bg-accent/5 transition-colors"
                                >
                                    <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </AppLayout>
    );
}
