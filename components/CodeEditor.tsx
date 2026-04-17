"use client";

import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import type { ReactCodeMirrorProps } from "@uiw/react-codemirror";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => (
    <div className="bg-code p-4 text-sm text-slate-400 font-mono">Loading editor...</div>
  ),
});

interface CodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  minHeight?: string;
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  minHeight = "220px",
}: CodeEditorProps) {
  const extensions: ReactCodeMirrorProps["extensions"] = [python()];
  return (
    <CodeMirror
      value={value}
      theme={oneDark}
      extensions={extensions}
      onChange={(v) => onChange?.(v)}
      readOnly={readOnly}
      editable={!readOnly}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: !readOnly,
        highlightActiveLineGutter: !readOnly,
        foldGutter: false,
        indentOnInput: true,
        tabSize: 4,
      }}
      style={{ minHeight }}
    />
  );
}
