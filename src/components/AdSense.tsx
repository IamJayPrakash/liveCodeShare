'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function AdSense() {
    const pathname = usePathname();
    // List of page paths that are safe for ads (high value content)
    const allowedPaths = [
        '/',
        '/about',
        '/privacy-policy',
        '/terms',
        '/help',
        '/faq',
    ];

    // Check if the current pathname exactly matches one of the allowed paths
    // We do NOT use startsWith because /room/123 is bad, but we want to be strict.
    // However, if we have dynamic sub-pages (e.g. /blog/post-1) we might need it.
    // For now, these are the only pages.
    const isAllowed = pathname ? allowedPaths.includes(pathname) : false;

    if (!isAllowed) {
        return null;
    }

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9129390699994968"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
