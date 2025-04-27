// src/app/server-sitemap.xml/route.ts
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export async function GET() {
  // You can fetch dynamic routes from your database here
  // For example, all room IDs that should be indexed
  const rooms = [
    { id: '1', lastModified: new Date().toISOString() },
    { id: '2', lastModified: new Date().toISOString() },
    // Add more static rooms or fetch dynamically
  ];

  const roomEntries: ISitemapField[] = rooms.map((room) => ({
    loc: `https://livecodeshare.vercel.app/room/${room.id}`,
    lastmod: room.lastModified,
    changefreq: 'weekly', // Matches the ISitemapField type
    priority: 0.7,
  }));

  const staticPages: ISitemapField[] = [
    {
      loc: 'https://livecodeshare.vercel.app',
      lastmod: new Date().toISOString(),
      changefreq: 'daily', // Matches the ISitemapField type
      priority: 1.0,
    },
    {
      loc: 'https://livecodeshare.vercel.app/about',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: 'https://livecodeshare.vercel.app/contact',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: 'https://livecodeshare.vercel.app/help',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: 'https://livecodeshare.vercel.app/privacy-policy',
      lastmod: new Date().toISOString(),
      changefreq: 'yearly',
      priority: 0.5,
    },
  ];

  return getServerSideSitemap([...staticPages, ...roomEntries]);
}
