"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  roomId: string;
};

export const CodeEditor = ({ roomId }: Props) => {
  const [code, setCode] = useState("// Write your code here");

  return (
    <div className="flex-1 p-4 bg-zinc-900 text-white">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full bg-zinc-800 p-4 text-sm font-mono rounded resize-none outline-none"
      />
      <div className="mt-2 flex justify-end">
        <Button onClick={() => alert("Run/Share feature coming soon!")}>Run</Button>
      </div>
    </div>
  );
};
