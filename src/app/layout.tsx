import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';

import { defaultMetadata, getWebsiteSchema, getOrganizationSchema, getSoftwareApplicationSchema } from '@/lib/metaData';

import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SocketProvider } from '@/context/SocketContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { ConnectionStatus } from '@/components/ConnectionStatus';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#0a192f',
};

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareApplicationSchema()),
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9129390699994968"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SocketProvider>
          <ThemeProvider defaultTheme="dark" storageKey="livecode-theme">
            <ConnectionStatus />
            <div className="min-h-screen bg-background font-sans antialiased">
              <main className="flex min-h-screen flex-col">{children}</main>
            </div>
          </ThemeProvider>
        </SocketProvider>
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}

