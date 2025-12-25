'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Mail, MessageSquare, Github, Linkedin } from 'lucide-react';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function ContactClient() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        submitting: false,
        submitted: false,
        error: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState((prev) => ({ ...prev, submitting: true }));

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setFormState((prev) => ({
                ...prev,
                submitting: false,
                submitted: true,
            }));
        } catch (error) {
            console.error('Error during form submission:', error);
            setFormState((prev) => ({
                ...prev,
                submitting: false,
                error: true,
            }));
        }
    };

    const resetForm = () => {
        setFormState({
            name: '',
            email: '',
            message: '',
            submitting: false,
            submitted: false,
            error: false,
        });
    };

    return (
        <AppLayout>
            <Header userCount={0} />
            <AnimatedBackground title="Contact Us" subtitle="We're here to help" >
                <div className="mt-4 px-4">
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                        Have questions about our <strong>online code sharing</strong> tool? We&apos;d love to hear from you.
                    </p>
                </div>
            </AnimatedBackground>

            <main className="flex-1 bg-background">
                <div className="container py-12 md:py-16 px-4 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mx-auto max-w-5xl space-y-12"
                    >
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <Card className="h-full shadow-lg border-primary/10">
                                    <CardHeader className="space-y-1">
                                        <CardTitle className="text-2xl flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Mail className="h-6 w-6 text-primary" />
                                            </div>
                                            Send a Message
                                        </CardTitle>
                                        <p className="text-muted-foreground">Fill out the form below and we will get back to you shortly.</p>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        {formState.submitted ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-center py-12 space-y-6"
                                            >
                                                <div className="mx-auto bg-green-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center">
                                                    <Send className="h-10 w-10 text-green-600" />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-2xl font-bold">Message Delivered!</h3>
                                                    <p className="text-muted-foreground text-lg">
                                                        Thank you for your feedback. Our team will review it and respond shortly.
                                                    </p>
                                                </div>
                                                <Button onClick={resetForm} variant="outline" size="lg" className="px-8">
                                                    Send Another Message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label htmlFor="name" className="text-sm font-semibold ml-1">
                                                            Full Name
                                                        </label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            placeholder="Enter your name"
                                                            className="h-12 bg-muted/30 focus-visible:ring-primary"
                                                            value={formState.name}
                                                            onChange={(e) =>
                                                                setFormState((prev) => ({ ...prev, name: e.target.value }))
                                                            }
                                                            required
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label htmlFor="email" className="text-sm font-semibold ml-1">
                                                            Email Address
                                                        </label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="name@example.com"
                                                            className="h-12 bg-muted/30 focus-visible:ring-primary"
                                                            value={formState.email}
                                                            onChange={(e) =>
                                                                setFormState((prev) => ({ ...prev, email: e.target.value }))
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="message" className="text-sm font-semibold ml-1">
                                                        How can we help?
                                                    </label>
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        placeholder="Describe your issue or feedback in detail..."
                                                        rows={6}
                                                        className="bg-muted/30 focus-visible:ring-primary resize-none"
                                                        value={formState.message}
                                                        onChange={(e) =>
                                                            setFormState((prev) => ({ ...prev, message: e.target.value }))
                                                        }
                                                        required
                                                    />
                                                </div>

                                                <Button type="submit" size="lg" className="w-full h-12 text-lg font-medium transition-all hover:shadow-md" disabled={formState.submitting}>
                                                    {formState.submitting ? (
                                                        <>
                                                            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-background border-r-transparent"></div>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send size={18} className="ml-3" />
                                                        </>
                                                    )}
                                                </Button>

                                                {formState.error && (
                                                    <p className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md text-center">
                                                        Oops! There was a problem sending your message. Please try again.
                                                    </p>
                                                )}
                                            </form>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="shadow-md border-primary/5">
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <MessageSquare className="h-5 w-5 text-primary" />
                                            </div>
                                            Support Channels
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-muted rounded-full">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">Email Support</h3>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                    Best for detailed inquiries:
                                                    <a href="mailto:iammrjayprakash@gmail.com" className="block text-primary hover:underline font-medium mt-1">
                                                        iammrjayprakash@gmail.com
                                                    </a>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-muted rounded-full">
                                                <Linkedin className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">LinkedIn</h3>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                    Professional profile:
                                                    <a href="https://www.linkedin.com/in/iamjayprakash" target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline font-medium mt-1">
                                                        linkedin.com/in/iamjayprakash
                                                    </a>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-muted rounded-full">
                                                <Github className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm">Community & Code</h3>
                                                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                                    Follow our progress:
                                                    <a href="https://github.com/iamjayprakash/livecodeshare" target="_blank" rel="noopener noreferrer" className="block text-primary hover:underline font-medium mt-1">
                                                        github.com/iamjayprakash
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-primary/5 border-primary/20 shadow-none">
                                    <CardContent className="pt-6">
                                        <h3 className="font-bold flex items-center gap-2 mb-3">
                                            <Github className="h-5 w-5 text-primary" />
                                            Technical Issue?
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                                            Reporting a bug or requesting a feature? Our GitHub Issue tracker is the fastest way to get it onto our roadmap.
                                        </p>
                                        <Button variant="default" className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold h-11" asChild>
                                            <a href="https://github.com/iamjayprakash/livecodeshare/issues" target="_blank" rel="noopener noreferrer">
                                                Open GitHub Issue
                                                <Github size={16} className="ml-2" />
                                            </a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </AppLayout>
    );
}
