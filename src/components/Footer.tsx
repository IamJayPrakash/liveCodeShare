"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} LiveCodeShare. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link 
              href="/about" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/iamjayprkash/livecodeshare" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={18} />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter size={18} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link 
            href="mailto:info@livecodeshare.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={18} />
            
            <span className="sr-only">Email</span>
          </Link>
          <Heart size={18} />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}