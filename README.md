# CrackPy

A 14-day Python interview prep app with in-browser Python execution. Built with Next.js, Tailwind, and Bun.

Features:
- 14 days of curriculum covering Python basics through DP, graphs, and two pointers
- ~40 LeetCode-style practice problems with auto-graded test cases
- Real Python execution in the browser via [Pyodide](https://pyodide.org)
- Code editor with Python syntax highlighting (CodeMirror)
- Progress tracking saved locally

## Getting started

```bash
bun install
bun dev
```

Open http://localhost:3000.

The first load downloads Pyodide (~6MB). After that everything runs client-side.

## Stack

- [Next.js 15](https://nextjs.org/) — App Router, React 19
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Pyodide](https://pyodide.org/) — CPython compiled to WebAssembly
- [CodeMirror 6](https://codemirror.net/) via `@uiw/react-codemirror`
- [Bun](https://bun.sh/) for install/dev
