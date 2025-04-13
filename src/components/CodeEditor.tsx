"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "@/lib/socket"; // adjust the import path if needed

const languages = ["javascript", "python", "cpp", "html", "css"];

const boilerplate: Record<string, string> = {
  javascript: `// JavaScript Example\nconsole.log("Hello, JavaScript!");`,
  python: `# Python Example\nprint("Hello, Python!")`,
  cpp: `// C++ Example\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++!";\n    return 0;\n}`,
  html: `<!-- HTML Example -->\n<!DOCTYPE html>\n<html>\n<head><title>HTML</title></head>\n<body>\n  <h1>Hello, HTML!</h1>\n</body>\n</html>`,
  css: `/* CSS Example */\nbody {\n  background-color: #000;\n  color: #fff;\n}`,
};

interface CodeEditorProps {
  roomId: string;
}

export default function CodeEditor({ roomId }: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(boilerplate["javascript"]);

  useEffect(() => {
    // Connect and join room
    socket.connect();
    socket.emit("join-room", roomId);

    // Listen for code updates from server
    socket.on("code-update", (newCode: string) => {
      setCode(newCode);
    });

    // Cleanup on unmount
    return () => {
      socket.off("code-update");
      socket.disconnect();
    };
  }, [roomId]);

  // Emit code changes to server
  const handleEditorChange = (value: string | undefined) => {
    const updatedCode = value || "";
    setCode(updatedCode);
    socket.emit("code-change", { roomId, code: updatedCode });
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex items-center justify-between">
        <select
          className="p-2 border rounded bg-black text-white"
          value={language}
          onChange={(e) => {
            const selectedLang = e.target.value;
            setLanguage(selectedLang);
            setCode(boilerplate[selectedLang]);
          }}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-400">Room ID: {roomId}</p>
      </div>

      <Editor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          fontLigatures: true,
        }}
      />
    </div>
  );
}
