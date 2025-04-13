"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";

type Props = {
  roomId: string;
};

export const CodeEditor = ({ roomId }: Props) => {
  const [code, setCode] = useState("// Write your code here");

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("code-update", (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.off("code-update");
    };
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("code-change", { roomId, code: newCode });
  };

  return (
    <div className="flex-1 p-4 bg-zinc-900 text-white">
      <textarea
        value={code}
        onChange={handleChange}
        className="w-full h-full bg-zinc-800 p-4 text-sm font-mono rounded resize-none outline-none"
      />
      <div className="flex justify-end">
        <Button onClick={() => alert("Run/Share feature coming soon!")}>
          Run
        </Button>
      </div>
    </div>
  );
};
