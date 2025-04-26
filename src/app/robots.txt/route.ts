// File: src/app/robots.txt/route.ts
import { NextResponse } from 'next/server';

// Serve robots.txt with SEO crawler directives (Edge Runtime)
export const runtime = 'edge';

export function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: https://livecodeshare.vercel.app/sitemap.xml
Host: livecodeshare.vercel.app
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
