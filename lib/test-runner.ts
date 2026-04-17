import { runPython } from "./pyodide";
import type { ExerciseStep, TestResult } from "./types";

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((x, i) => deepEqual(x, b[i]));
  }
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < 1e-9;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) =>
      deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
    );
  }
  return false;
}

export async function runExerciseTests(
  step: ExerciseStep,
  userCode: string,
): Promise<{ results: TestResult[]; allPassed: boolean }> {
  if (!step.tests || step.tests.length === 0) {
    return { results: [], allPassed: false };
  }
  const results: TestResult[] = [];
  let passed = 0;
  for (const t of step.tests) {
    const pyCode = `
${userCode}
import json as _j
_actual = ${t.call}
print("::TESTRESULT::" + _j.dumps(_actual, default=str))
`;
    const r = await runPython(pyCode);
    let actual: unknown = null;
    let errorMsg: string | null = null;
    const marker = "::TESTRESULT::";
    const idx = r.stdout.lastIndexOf(marker);
    if (idx !== -1) {
      const line = r.stdout.slice(idx + marker.length).split("\n")[0].trim();
      try {
        actual = JSON.parse(line);
      } catch {
        errorMsg = "Could not parse output.";
      }
    } else {
      errorMsg = r.stderr || "No return value captured.";
    }
    const pass = !errorMsg && deepEqual(actual, t.expected);
    if (pass) passed++;
    results.push({ call: t.call, expected: t.expected, actual, pass, errorMsg });
  }
  return { results, allPassed: passed === step.tests.length };
}
