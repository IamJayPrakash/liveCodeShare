'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, Heart, ExternalLink, Code, FileCode, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background pt-12 pb-8 relative">
      {/* Decorative gradient element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="container px-4 md:px-8 lg:px-12 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {/* Brand section with enhanced styling */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <Code className="mr-2 text-primary h-6 w-6" />
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                LiveCode<span className="text-primary">Share</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Collaborate on code in real-time with developers around the world.
              Build together, learn together, code together.
            </p>
            
            {/* Social links with enhanced styling */}
            <div className="flex items-center mt-6 space-x-3">
              <Link
                href="https://github.com/iamjayprkash/livecodeshare"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2.5 bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:-translate-y-1 shadow-sm"
                aria-label="GitHub"
              >
                <Github size={18} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2.5 bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:-translate-y-1 shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="mailto:info@livecodeshare.com"
                className="rounded-full p-2.5 bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:-translate-y-1 shadow-sm"
                aria-label="Email"
              >
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Resources section with enhanced styling */}
          <div className="flex flex-col">
            <div className="flex items-center mb-5">
              <FileCode className="mr-2 text-primary h-4 w-4" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Resources</h3>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                <span className="group-hover:underline">About</span>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                <span className="group-hover:underline">Contact</span>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                <span className="group-hover:underline">Privacy Policy</span>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>

          {/* Support section with enhanced styling */}
          <div className="flex flex-col">
            <div className="flex items-center mb-5">
              <Sparkles className="mr-2 text-primary h-4 w-4" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Support</h3>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/help"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                <span className="group-hover:underline">Help Center</span>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/faq"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                <span className="group-hover:underline">FAQ</span>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors group flex items-center"
              >
                <span className="group-hover:underline">Terms of Service</span>
                <ExternalLink size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </nav>
          </div>

          {/* Settings section with enhanced styling */}
          <div className="flex flex-col">
            <div className="flex items-center mb-5">
              <Sparkles className="mr-2 text-primary h-4 w-4" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Settings</h3>
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-muted-foreground mb-2">Toggle between light and dark mode</p>
              <div className="flex items-center p-3 rounded-lg bg-secondary/40 backdrop-blur-sm">
                <ThemeToggle />
                <span className="ml-3 text-sm font-medium">Theme</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 opacity-30" />

        {/* Bottom footer with enhanced styling */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground mb-4 sm:mb-0 flex items-center">
            <span>© {currentYear} LiveCodeShare. All rights reserved.</span>
          </p>
          
          <div className="flex items-center text-sm bg-secondary/30 px-4 py-2 rounded-full">
            <span className="text-muted-foreground">Crafted with</span>
            <Heart size={14} className="mx-1.5 text-destructive animate-pulse" fill="currentColor" />
            <span className="text-muted-foreground">for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
