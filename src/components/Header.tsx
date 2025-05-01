import React from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { ShareRoomButton } from './ShareRoomButtton';
import { ThemeToggle } from './theme/ThemeToggle';

interface HeaderProps {
  readonly roomId?: string;
  readonly userCount: number;
}

export function Header({ roomId, userCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <code className="text-md font-semibold text-primary-foreground">&lt;/&gt;</code>
            </div>
            <span className="hidden font-bold sm:inline-block">LiveCodeShare</span>
          </Link>

          {roomId && (
            <div className="ml-2 md:ml-4 flex items-center space-x-2">
              <div className="hidden rounded-full border px-3 py-1 text-xs text-muted-foreground sm:block">
                Room: <span className="font-mono font-medium text-foreground">{roomId}</span>
              </div>
              {userCount > 0 && (
                <div className="flex items-center space-x-1 rounded-full border px-3 py-1 text-xs">
                  <Users size={12} className="relative top-px"/>
                  <span>{userCount}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {roomId && <ShareRoomButton roomId={roomId} />}
          <Link href="/help" className="hidden text-sm font-medium sm:inline-block md:text-base">
            How to use?
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
