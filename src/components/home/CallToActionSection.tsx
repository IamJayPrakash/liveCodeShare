'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallToActionSection() {
    return (
        <section className="py-20 bg-primary/5 relative overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-6">
                    Ready to Start Coding Together?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                    Join thousands of developers who use LiveCodeShare for interviews, teaching, and pair
                    programming. No account required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button size="lg" className="h-12 px-8 text-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        Create an Instant Room
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                        <Link href="/about">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
