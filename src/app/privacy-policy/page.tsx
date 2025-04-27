'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
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
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
            </div>
            <p>
              Welcome to <strong>LiveCodeShare</strong>. Your privacy is important to us. This
              Privacy Policy explains how we collect, use, and protect your personal information
              when you use our platform.
            </p>
            <div className="prose dark:prose-invert mx-auto max-w-3xl flex flex-col gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                1. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-5 md:pl-8">
                <li>
                  <strong>Personal Information:</strong> Name, email address, and other details you
                  provide when signing up or contacting us.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how you use the platform, including IP
                  address, browser type, and device information.
                </li>
                <li>
                  <strong>Session Data:</strong> Code snippets, room interactions, and other data
                  shared during collaborative sessions.
                </li>
              </ul>

              <h2 className="text-2xl font-bold flex items-center gap-2">
                2. How We Use Your Information
              </h2>
              <p>We use the collected data to:</p>
              <ul className="list-disc pl-5 md:pl-8">
                <li>Provide and improve the LiveCodeShare experience.</li>
                <li>Communicate with users (e.g., for support or updates).</li>
                <li>Maintain platform security and monitor usage patterns.</li>
              </ul>

              <h2 className="text-2xl font-bold flex items-center gap-2">
                3. Cookies & Tracking Technologies
              </h2>
              <p>We may use cookies or similar technologies to:</p>
              <ul className="list-disc pl-5 md:pl-8">
                <li>Keep you logged in.</li>
                <li>Track usage metrics to improve performance.</li>
                <li>Remember preferences for a personalized experience.</li>
              </ul>
              <p>You can control cookies through your browser settings.</p>

              <h2 className="text-2xl font-bold flex items-center gap-2">
                4. Third-Party Services
              </h2>
              <p>
                We may use trusted third-party services for authentication, analytics, or storage
                (e.g., Firebase, Google Analytics). These services may collect data according to
                their own privacy policies.
              </p>

              <h2 className="text-2xl font-bold flex items-center gap-2">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to safeguard your
                information. However, no system is 100% secure, and we cannot guarantee absolute
                protection.
              </p>
              <h2 className="text-2xl font-bold flex items-center gap-2">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 md:pl-8">
                <li>Access or update your personal information.</li>
                <li>Withdraw consent for data processing.</li>
                <li>
                  To exercise any of these rights, please contact us at: [Insert contact email].
                </li>
              </ul>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will update the
                &quot;Effective Date&quot; at the top of the page.
              </p>
              <h2 className="text-2xl font-bold flex items-center gap-2">8. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please reach out to
                us at:
              </p>
              <p className="flex flex-col gap-1">
                <label>Email: livecodeshare@gmail.com</label>
                <label>Website: https://livecodeshare.vercel.app/</label>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </AppLayout>
  );
}
