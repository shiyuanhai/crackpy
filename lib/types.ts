export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Concept {
  title: string;
  content: string; // HTML
  code?: string;
}

export type TestExpected = string | number | boolean | null | TestExpected[] | { [k: string]: TestExpected };

export interface TestCase {
  call: string;
  expected: TestExpected;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string; // HTML
  starter: string;
  solution: string;
  hint: string;
  tests?: TestCase[];
  fnName?: string;
  skipAutoTest?: boolean;
}

export interface Day {
  id: number;
  title: string;
  subtitle: string;
  estimatedTime: string;
  objectives: string[];
  concepts: Concept[];
  problems: Problem[];
}

export interface DayProgress {
  solved: string[];
}

export interface AppState {
  currentDay: number;
  progress: Record<number, DayProgress>;
  savedCode: Record<string, string>;
}

export interface PyResult {
  stdout: string;
  stderr: string;
  ok: boolean;
}

export interface TestResult {
  call: string;
  expected: TestExpected;
  actual: unknown;
  pass: boolean;
  errorMsg?: string | null;
}
