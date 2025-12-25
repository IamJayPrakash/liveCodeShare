import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check } from 'lucide-react';

interface ShareRoomButtonProps {
  readonly roomId: string;
}

export function ShareRoomButton({ roomId }: ShareRoomButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const roomUrl = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(roomUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShareClick}
      className="gap-1.5 transition-all"
      aria-label={copied ? "Room link copied to clipboard" : "Share room link"}
    >
      {copied ? (
        <>
          <Check size={14} className="text-green-500" aria-hidden="true" />
          <span className="text-xs" role="status" aria-live="polite">
            Copied!
          </span>
        </>
      ) : (
        <>
          <Share2 size={14} aria-hidden="true" />
          <span className="text-xs sm:inline-block">Share</span>
        </>
      )}
    </Button>
  );
}
