import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SocketProvider } from "@/context/SocketContext";
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"),
  title: "LiveCodeShare",
  description: "Real-time code sharing platform like CodeShare.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SocketProvider>
        <ThemeProvider defaultTheme="dark" storageKey="livecode-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <main className="flex min-h-screen flex-col">
          {children}
          </main>
      </div>
    </ThemeProvider>
        </SocketProvider>
        <Analytics />
      </body>
    </html>
  );
}
