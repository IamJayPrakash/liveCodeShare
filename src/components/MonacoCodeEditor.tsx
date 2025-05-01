// components/CodeEditor/MonacoCodeEditor.tsx
import React from 'react';
import Editor from '@monaco-editor/react';

interface MonacoCodeEditorProps {
  language: string;
  code: string;
  onChange: (value: string | undefined) => void;
}

const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  language,
  code,
  onChange,
}) => {
  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={onChange}
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
        suggest: {
            showWords: true,
          },
          quickSuggestions: true,
          suggestOnTriggerCharacters: true,
          fixedOverflowWidgets: true, // important for custom layouts
          lineHeight: 20,
 
      }}
      theme="vs-dark"
    />
  );
};

export default MonacoCodeEditor;
