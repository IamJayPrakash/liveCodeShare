'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consented = localStorage.getItem('cookie-consent');
        if (!consented) {
            setShow(true);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl">
                <div className="text-sm text-muted-foreground flex-1">
                    <p>
                        We use cookies to improve your experience and serve personalized content. By using our site, you acknowledge that you have read and understand our{' '}
                        <Link href="/privacy-policy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>{' '}
                        and{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </Link>.
                    </p>
                </div>
                <button
                    onClick={accept}
                    className="min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
}
