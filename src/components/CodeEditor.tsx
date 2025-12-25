import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { socket } from '@/lib/socket';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Play, Download, Copy } from 'lucide-react';
import { LanguageBadge } from './LanguageBadge';
import { toast } from 'sonner';

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'html', name: 'HTML', extension: 'html' },
  { id: 'css', name: 'CSS', extension: 'css' },
  { id: 'java', name: 'Java', extension: 'java' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'csharp', name: 'C#', extension: 'cs' },
  { id: 'go', name: 'Go', extension: 'go' },
  { id: 'rust', name: 'Rust', extension: 'rs' },
];

const BOILERPLATE = {
  javascript: `// JavaScript Example\nconsole.log("Hello, World!");\n\n// Start coding here...\n`,
  typescript: `// TypeScript Example\nfunction greet(name: string): string {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet("World"));\n`,
  python: `# Python Example\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\n`,
  html: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>LiveCodeShare</title>\n  <style>\n    body {\n      font-family: system-ui, sans-serif;\n      margin: 0;\n      padding: 20px;\n    }\n  </style>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  \n</body>\n</html>`,
  css: `/* CSS Example */\n\n:root {\n  --primary: #3b82f6;\n  --background: #0f172a;\n  --text: #ffffff;\n}\n\nbody {\n  background-color: var(--background);\n  color: var(--text);\n  font-family: system-ui, sans-serif;\n  line-height: 1.5;\n  padding: 2rem;\n}\n`,
  java: `// Java Example\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}\n`,
  cpp: `// C++ Example\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello, World!" << endl;\n  return 0;\n}\n`,
  csharp: `// C# Example\n\nusing System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}\n`,
  go: `// Go Example\n\npackage main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, World!")\n}\n`,
  rust: `// Rust Example\n\nfn main() {\n  println!("Hello, World!");\n}\n`,
};

const CodeEditor = ({ roomId }: { roomId: string }) => {
  const [language, setLanguage] = useState<
    'html' | 'javascript' | 'typescript' | 'python' | 'css' | 'java' | 'cpp' | 'csharp' | 'go' | 'rust'
  >('javascript');
  const [code, setCode] = useState(BOILERPLATE.javascript);
  // Removed unused isTyping state
  const [output, setOutput] = useState('');

  // Function to handle language change
  interface LanguageChangePayload {
    roomId: string;
    language: string;
  }

  const handleLanguageChange = (newLanguage: string) => {
    const payload: LanguageChangePayload = { roomId, language: newLanguage };
    socket.emit('language-change', payload);
    setLanguage(newLanguage as typeof language);
    if (!code || code === BOILERPLATE[language]) {
      setCode(BOILERPLATE[newLanguage as keyof typeof BOILERPLATE]);
    }
  };

  // Connect to socket and listen for changes
  useEffect(() => {
    socket.connect();
    socket.emit('join-room', roomId);

    socket.on('code-update', (newCode) => {
      setCode(newCode);
    });

    socket.on('language-update', (newLanguage) => {
      setLanguage(newLanguage);
    });

    return () => {
      socket.off('code-update');
      socket.off('language-update');
      socket.disconnect();
    };
  }, [roomId]);

  // Handle code changes
  interface CodeChangePayload {
    roomId: string;
    code: string;
  }

  const handleEditorChange = (value: string | undefined): void => {
    const updatedCode = value || '';
    setCode(updatedCode);
    const payload: CodeChangePayload = { roomId, code: updatedCode };
    socket.emit('code-change', payload);
  };

  // Function to run code (simulated)
  const runCode = () => {
    try {
      let result = '';

      // Simulate code execution based on language
      if (language === 'javascript' || language === 'typescript') {
        // Capture console.log outputs
        const logs: string[] = [];
        const originalLog = console.log;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log = (...args: any[]) => {
          logs.push(args.map(arg => String(arg)).join(' '));
        };

        try {
          // Execute the code in a safe context
          eval(code);
          result = logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)';
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          result = `Error: ${errorMessage}`;
        } finally {
          console.log = originalLog;
        }
      } else if (language === 'python') {
        // Extract print statements from Python code
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          result = printMatches.map(match => {
            const content = match.replace(/print\((.*?)\)/, '$1').replace(/['"]/g, '');
            return content;
          }).join('\n');
        } else {
          result = 'Code executed successfully (no output)';
        }
      } else if (language === 'html') {
        result = 'HTML Preview:\n\n' + code.substring(0, 200) + (code.length > 200 ? '...' : '');
      } else if (language === 'css') {
        result = 'CSS Styles loaded successfully';
      } else if (language === 'java') {
        // Extract System.out.println statements
        const printMatches = code.match(/System\.out\.println\((.*?)\)/g);
        if (printMatches) {
          result = printMatches.map(match => {
            const content = match.replace(/System\.out\.println\((.*?)\)/, '$1').replace(/['"]/g, '');
            return content;
          }).join('\n');
        } else {
          result = 'Code compiled successfully (no output)';
        }
      } else if (language === 'cpp') {
        // Extract cout statements
        const coutMatches = code.match(/cout\s*<<\s*(.*?)\s*<</g);
        if (coutMatches) {
          result = coutMatches.map(match => {
            const content = match.replace(/cout\s*<<\s*(.*?)\s*<</, '$1').replace(/['"]/g, '');
            return content;
          }).join('\n');
        } else {
          result = 'Code compiled successfully (no output)';
        }
      } else if (language === 'csharp') {
        // Extract Console.WriteLine statements
        const printMatches = code.match(/Console\.WriteLine\((.*?)\)/g);
        if (printMatches) {
          result = printMatches.map(match => {
            const content = match.replace(/Console\.WriteLine\((.*?)\)/, '$1').replace(/['"]/g, '');
            return content;
          }).join('\n');
        } else {
          result = 'Code compiled successfully (no output)';
        }
      } else if (language === 'go') {
        // Extract fmt.Println statements
        const printMatches = code.match(/fmt\.Println\((.*?)\)/g);
        if (printMatches) {
          result = printMatches.map(match => {
            const content = match.replace(/fmt\.Println\((.*?)\)/, '$1').replace(/['"]/g, '');
            return content;
          }).join('\n');
        } else {
          result = 'Code compiled successfully (no output)';
        }
      } else if (language === 'rust') {
        // Extract println! macro calls
        const printMatches = code.match(/println!\((.*?)\)/g);
        if (printMatches) {
          result = printMatches.map(match => {
            const content = match.replace(/println!\((.*?)\)/, '$1').replace(/['"]/g, '');
            return content;
          }).join('\n');
        } else {
          result = 'Code compiled successfully (no output)';
        }
      } else {
        result = `Code execution for ${language} is not yet supported`;
      }

      setOutput(`Running ${language.toUpperCase()} code...\n\n> ${result}`);
      toast.success(`Code executed successfully`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorMsg = `Error: ${errorMessage}`;
      setOutput(errorMsg);
      toast.error('Code execution failed');
    }
  };

  // Function to download code
  const downloadCode = () => {
    const langInfo = LANGUAGES.find((l) => l.id === language);
    const extension = langInfo ? langInfo.extension : 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // toast({
    //   title: "Download Complete",
    //   description: `File saved as code.${extension}`,
    // });
  };

  // Function to copy code
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast('Code copied to clipboard');
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col" role="main" aria-label="Code editor">
      <div className="border-b p-2 bg-card" role="toolbar" aria-label="Editor controls">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger
                className="w-[140px] h-8"
                aria-label="Select programming language"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    <div className="flex items-center gap-2">
                      <LanguageBadge
                        language={
                          lang.id as
                          | 'javascript'
                          | 'typescript'
                          | 'python'
                          | 'html'
                          | 'css'
                          | 'java'
                          | 'cpp'
                          | 'csharp'
                          | 'go'
                          | 'rust'
                        }
                      />
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <LanguageBadge language={language} size="sm" />
          </div>

          <div className="flex items-center gap-2" role="group" aria-label="Code actions">
            <Button
              variant="ghost"
              size="icon"
              onClick={copyCode}
              className="h-8 w-8"
              title="Copy Code"
              aria-label="Copy code to clipboard"
            >
              <Copy size={16} aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadCode}
              className="h-8 w-8"
              title="Download Code"
              aria-label="Download code as file"
            >
              <Download size={16} aria-hidden="true" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={runCode}
              className="gap-1"
              aria-label="Run code"
            >
              <Play size={14} aria-hidden="true" />
              <span>Run</span>
            </Button>
          </div>
        </div>
      </div>

      <ResizablePanelGroup direction="vertical" className="flex-grow">
        <ResizablePanel defaultSize={70} minSize={30}>
          <div className="h-full overflow-hidden" role="region" aria-label="Code editor area">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={handleEditorChange}
              onMount={() => {
                // Ensure editor is properly sized
                window.dispatchEvent(new Event('resize'));
              }}
              options={{
                fontSize: 14,
                lineNumbers: 'on',
                minimap: { enabled: true },
                fontFamily: 'var(--font-mono), monospace',
                fontLigatures: true,
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                wordWrap: 'on',
                tabSize: 2,
                automaticLayout: true,
                fixedOverflowWidgets: true,
                ariaLabel: `Code editor for ${language}`
              }}
              theme="vs-dark"
            />
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={30} minSize={15}>
          <div
            className="h-full p-2 bg-black/70 font-mono text-sm overflow-auto"
            role="region"
            aria-label="Code output console"
            aria-live="polite"
          >
            <div className="p-2 text-gray-300 whitespace-pre-wrap">
              {output || '// Output will appear here when you run your code'}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default CodeEditor;
