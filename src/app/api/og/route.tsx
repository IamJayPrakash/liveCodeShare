// src/app/api/og/route.tsx
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // Get dynamic params
  const title = searchParams.get('title') || 'LiveCodeShare';
  const description = searchParams.get('description') || 'Real-time code collaboration platform';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '40px 80px',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#4F46E5" />
              <path d="M7 8h10M7 12h10M7 16h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span
              style={{
                marginLeft: 16,
                fontSize: 48,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #4F46E5 0%, #60A5FA 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              LiveCodeShare
            </span>
          </div>
          <h1
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              margin: 0,
              marginBottom: 20,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: '#D1D5DB',
              margin: 0,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}