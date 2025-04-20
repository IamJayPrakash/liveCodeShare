import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="livecode-theme">
      <div className="min-h-screen bg-background font-sans antialiased">
        <main className="flex min-h-screen flex-col">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

// components/layout/Header.jsx
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {  Users } from 'lucide-react';
import { ShareRoomButton } from '../ShareRoomButtton';

export function Header({ roomId, userCount }: Readonly<{ roomId?: string; userCount: number }>) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <code className="text-md font-semibold text-primary-foreground">&lt;/&gt;</code>
            </div>
            <span className="hidden font-bold sm:inline-block">LiveCodeShare</span>
          </Link>
          {roomId && (
            <div className="ml-4 flex items-center space-x-2">
              <div className="hidden rounded-full border px-3 py-1 text-xs text-muted-foreground md:block">
                Room: <span className="font-mono font-medium text-foreground">{roomId}</span>
              </div>
              {userCount > 0 && (
                <div className="flex items-center space-x-1 rounded-full border px-3 py-1 text-xs">
                  <Users size={12} />
                  <span>{userCount}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {roomId && (
            <ShareRoomButton roomId={roomId} />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
