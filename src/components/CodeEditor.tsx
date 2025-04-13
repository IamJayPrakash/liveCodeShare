"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type CodeEditorProps = {
  roomId: string;
};

export const CodeEditor = ({ roomId }: CodeEditorProps) => {
  const [code, setCode] = useState("// Write your code here");

  const handleRun = () => {
    alert("Run/Share feature coming soon!");
  };

  return (
    <div className="flex-1 p-4 bg-zinc-900 text-white flex flex-col">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full bg-zinc-800 p-4 text-sm font-mono rounded resize-none outline-none"
      />
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-zinc-400">Room: {roomId}</span>
        <Button onClick={handleRun}>Run</Button>
      </div>
    </div>
  );
};
