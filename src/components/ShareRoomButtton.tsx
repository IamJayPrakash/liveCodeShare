import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ShareRoomButton({ roomId }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShareClick = () => {
    const roomUrl = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(roomUrl).then(() => {
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Room URL has been copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleShareClick}
      className="gap-1.5 transition-all"
    >
      {copied ? (
        <>
          <Check size={14} className="text-green-500" />
          <span className="text-xs">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={14} />
          <span className="text-xs sm:inline-block">Share</span>
        </>
      )}
    </Button>
  );
}