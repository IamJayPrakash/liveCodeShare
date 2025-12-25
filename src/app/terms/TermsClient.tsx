'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function TermsClient() {
    return (
        <AppLayout>
            <Header userCount={0} />
            <AnimatedBackground title="Terms of Service" subtitle="By using our services, you agree to these terms." >
                <div className="mt-4">
                    <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                        Last updated: {new Date().toLocaleDateString()}
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
                        <div className="prose dark:prose-invert mx-auto max-w-3xl space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
                                <p className="leading-relaxed text-lg">
                                    By accessing and using LiveCodeShare, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this websites particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">2. Description of Service</h2>
                                <p className="leading-relaxed">
                                    LiveCodeShare provides users with real-time code collaboration tools. You understand and agree that the Service is provided &quot;AS-IS&quot; and that LiveCodeShare assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">3. User Conduct</h2>
                                <p className="leading-relaxed">
                                    You agree to not use the Service to:
                                </p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, or otherwise objectionable.</li>
                                    <li>Harm minors in any way.</li>
                                    <li>Impersonate any person or entity.</li>
                                    <li>Upload code that contains viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware.</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">4. Intellectual Property</h2>
                                <p className="leading-relaxed">
                                    You acknowledge and agree that the Service and any necessary software used in connection with the Service contain proprietary and confidential information that is protected by applicable intellectual property and other laws.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">5. Termination</h2>
                                <p className="leading-relaxed">
                                    You agree that LiveCodeShare may, under certain circumstances and without prior notice, immediately terminate your account and access to the Service. Cause for such termination shall include, but not be limited to, breaches or violations of the TOS or other incorporated agreements or guidelines.
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
