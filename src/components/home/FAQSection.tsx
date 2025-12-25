'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
    {
        question: 'Is LiveCodeShare free to use?',
        answer:
            'Yes, LiveCodeShare is completely free for all users. You can create unlimited rooms and collaborate with as many people as you want without any cost.',
    },
    {
        question: 'Do I need to sign up to use LiveCodeShare?',
        answer:
            'No, you do not need to create an account. Simply click "Create a New Room" to get started instantly. However, we plan to add user accounts in the future for saving your snippets.',
    },
    {
        question: 'How many people can collaborate in a single room?',
        answer:
            'While there is no strict hard limit, we recommend keeping rooms to under 10 active participants for the best performance and user experience during real-time typing.',
    },
    {
        question: 'What programming languages are supported?',
        answer:
            'We support a wide range of popular programming languages including JavaScript, TypeScript, Python, Java, C++, HTML, CSS, Go, Rust, and many more. The editor provides syntax highlighting for over 50 languages.',
    },
    {
        question: 'Is my code saved?',
        answer:
            'Currently, LiveCodeShare is designed for real-time collaboration. The code exists in the room as long as the session is active. We recommend saving your code locally before closing the window.',
    },
    {
        question: 'Can I use LiveCodeShare on mobile devices?',
        answer:
            'Yes! LiveCodeShare is fully responsive and works on mobile phones and tablets, allowing you to view and edit code on the go.',
    },
];

export function FAQSection() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about LiveCodeShare.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-lg font-medium">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
