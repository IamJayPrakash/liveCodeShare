"use client";

import { useState } from 'react';
import { toast } from 'sonner';

const ShareButton = ({ roomId }: { roomId: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    const roomUrl = `${window.location.origin}/room/${roomId}`;

    navigator.clipboard.writeText(roomUrl).then(() => {
      setCopied(true);
      toast.success('Room URL copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy URL');
    });
  };

  return (
    <div>
      <button
        className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleShareClick}
      >
        {copied ? 'URL Copied!' : 'Share Room URL'}
      </button>
    </div>
  );
};

export default ShareButton;
