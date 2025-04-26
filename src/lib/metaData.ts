// src/lib/metadata.ts
import { Metadata } from 'next';

// Base URL for the site
export const siteUrl = 'https://livecodeshare.vercel.app';

// Default metadata values
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LiveCodeShare - Real-Time Collaborative Code Editor & Pair Programming Tool',
    template: '%s | LiveCodeShare',
  },
  description:
    'LiveCodeShare is a real-time collaborative code editor built for developers, interviewers, educators, and teams. Share code instantly, collaborate effortlessly, and enjoy a smooth coding experience with syntax highlighting, customizable themes, live editing, and more.',
  keywords: [
    'livecodeshare',
    'live code sharing',
    'real-time code collaboration',
    'pair programming tool',
    'collaborative coding platform',
    'live code editor',
    'online IDE',
    'real-time code editor',
    'remote coding interview tool',
    'coding interviews',
    'syntax highlighting editor',
    'monaco editor',
    'next.js projects',
    'socket.io project',
    'live coding sessions',
    'developer collaboration',
    'instant code sharing',
    'remote team coding',
    'online code playground',
    'developer productivity tool',
    'collaborative programming editor',
    'share code online',
    'web-based code editor',
    'free online IDE',
    'team coding app',
    'live pair programming',
    'remote coding assessments',
    'best online code editor',
    'real-time programming platform'
  ],
  authors: [{ name: 'Jay Prakash', url: 'https://github.com/IamJayPrakash' }],
  creator: 'Jay Prakash',
  publisher: 'LiveCodeShare',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: '1mlwv5pCe6_Ncql6DKNDstpFNiDWNEt8FPKblJ0fAI0',
    other: {
      'bing': 'BING_VERIFICATION_CODE', // If you want later
      'yandex': 'YANDEX_VERIFICATION_CODE',
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'LiveCodeShare',
    title: 'LiveCodeShare - Real-Time Collaborative Code Editor & Online IDE',
    description:
      'Share, edit, and collaborate on code in real-time with LiveCodeShare. Built for developers, teams, educators, and interviewers. Fast, free, and powerful.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LiveCodeShare - Real-Time Collaborative Code Editor',
      },
      {
        url: `${siteUrl}/secondary-og-image.png`,
        width: 800,
        height: 600,
        alt: 'Collaborate Online with LiveCodeShare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LiveCodeShare - Real-Time Collaborative Code Editor',
    description: 'Collaborate on code instantly with syntax highlighting, live rooms, and customizable themes. Perfect for developers, interviews, and educators.',
    site: '@IamJayPrakash',
    creator: '@IamJayPrakash',
    images: [`${siteUrl}/twitter-image.png`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: `${siteUrl}/site.webmanifest`,
  themeColor: '#0a192f',
  category: 'Developer Tools',
  applicationName: 'LiveCodeShare',
  generator: 'Next.js, TypeScript, Tailwind CSS',
};

// --- generateMetadata function (same but cleaner) ---
export function generateMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const fullUrl = path ? `${siteUrl}${path}` : siteUrl;
  const imageUrl = ogImage || `${siteUrl}/og-image.png`;

  return {
    ...defaultMetadata,
    title: title || defaultMetadata.title,
    description: description || defaultMetadata.description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      url: fullUrl,
      title: title || defaultMetadata.openGraph?.title,
      description: description || defaultMetadata.openGraph?.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || 'LiveCodeShare',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: title || defaultMetadata.twitter?.title,
      description: description || defaultMetadata.twitter?.description,
      images: [imageUrl],
    },
  };
}

// --- Add More Structured Schema (Rich SEO) ---
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LiveCodeShare',
    alternateName: 'Live Code Sharing and Real-time Collaboration',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LiveCodeShare',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://github.com/IamJayPrakash',
      'https://linkedin.com/in/jayprakash-dev', // Add if available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@livecodeshare.vercel.app',
      contactType: 'Customer Support',
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'LiveCodeShare',
    operatingSystem: 'Web',
    applicationCategory: 'DeveloperApplication',
    url: siteUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '250',
    },
  };
}
