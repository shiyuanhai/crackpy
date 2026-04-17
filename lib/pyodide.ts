import type { PyResult } from "./types";

const PYODIDE_VERSION = "v0.26.4";
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

type PyodideInstance = {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<PyodideInstance>;
  }
}

let pyodidePromise: Promise<PyodideInstance> | null = null;
let pyodide: PyodideInstance | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

export async function initPyodide(): Promise<PyodideInstance> {
  if (pyodide) return pyodide;
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    await loadScript(INDEX_URL + "pyodide.js");
    if (!window.loadPyodide) throw new Error("loadPyodide not available");
    const py = await window.loadPyodide({ indexURL: INDEX_URL });
    py.runPython(`
import sys, io
def _reset_io():
    sys.stdout = io.StringIO()
    sys.stderr = io.StringIO()
def _get_stdout():
    return sys.stdout.getvalue()
def _get_stderr():
    return sys.stderr.getvalue()
`);
    pyodide = py;
    return py;
  })();
  return pyodidePromise;
}

export async function runPython(code: string): Promise<PyResult> {
  if (!pyodide) {
    return {
      stdout: "",
      stderr: "Python runtime not ready yet — please wait.",
      ok: false,
    };
  }
  try {
    pyodide.runPython("_reset_io()");
    await pyodide.runPythonAsync(code);
    const stdout = pyodide.runPython("_get_stdout()") as string;
    const stderr = pyodide.runPython("_get_stderr()") as string;
    return { stdout, stderr, ok: true };
  } catch (err: unknown) {
    let stdout = "";
    try {
      stdout = (pyodide.runPython("_get_stdout()") as string) ?? "";
    } catch {
      /* ignore — runtime may be in a bad state */
    }
    const rawMessage = err instanceof Error ? err.message : String(err);
    const stderr = rawMessage && rawMessage.trim() ? rawMessage : "Unknown Python error";
    return { stdout, stderr, ok: false };
  }
}

export function isPyodideReady(): boolean {
  return pyodide !== null;
}
