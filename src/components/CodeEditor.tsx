"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

const languages = ["javascript", "python", "cpp", "html", "css"];

const boilerplate: Record<string, string> = {
  javascript: `// JavaScript Example\nconsole.log("Hello, JavaScript!");`,
  python: `# Python Example\nprint("Hello, Python!")`,
  cpp: `// C++ Example\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++!";\n    return 0;\n}`,
  html: `<!-- HTML Example -->\n<!DOCTYPE html>\n<html>\n<head><title>HTML</title></head>\n<body>\n  <h1>Hello, HTML!</h1>\n</body>\n</html>`,
  css: `/* CSS Example */\nbody {\n  background-color: #000;\n  color: #fff;\n}`,
};

interface CodeEditorProps {
  roomId: string; // to be used later for socket sync
}

export default function CodeEditor({ roomId }: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(boilerplate["javascript"]);

  useEffect(() => {
    setCode(boilerplate[language]);
  }, [language]);

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex items-center justify-between">
        <select
          className="p-2 border rounded bg-black text-white"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
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
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          fontLigatures: true,
        }}
      />
    </div>
  );
}
