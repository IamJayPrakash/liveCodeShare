'use client';

import { NextSeo } from 'next-seo';
import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: Record<string, unknown>;
}

export default function Seo({
  title = 'LiveCodeShare - Real-Time Collaborative Code Editor',
  description = 'Collaborate on code in real-time with syntax highlighting, customizable editor themes, and shareable rooms.',
  canonicalUrl = 'https://livecodeshare.vercel.app',
  ogImage = 'https://livecodeshare.vercel.app/og-image.png',
  ogType = 'website',
  structuredData,
}: SeoProps) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title,
          description,
          type: ogType,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          siteName: 'LiveCodeShare',
        }}
        twitter={{
          handle: '@IamJayPrakash',
          site: '@IamJayPrakash',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>
    </>
  );
}
