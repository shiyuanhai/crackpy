import type { LocalizedText } from "./i18n";

export type Difficulty = "Easy" | "Medium" | "Hard";

export type TestExpected =
  | string
  | number
  | boolean
  | null
  | TestExpected[]
  | { [k: string]: TestExpected };

export interface TestCase {
  call: string;
  expected: TestExpected;
}

export interface TestResult {
  call: string;
  expected: TestExpected;
  actual: unknown;
  pass: boolean;
  errorMsg?: string | null;
}

export interface PyResult {
  stdout: string;
  stderr: string;
  ok: boolean;
}

export type StepKind =
  | "teach"
  | "demo"
  | "exercise"
  | "quiz_mc"
  | "quiz_text"
  | "recall"
  | "checkpoint";

export interface TeachStep {
  kind: "teach";
  id: string;
  from: "teacher";
  text: LocalizedText;
}

export interface DemoStep {
  kind: "demo";
  id: string;
  from: "teacher";
  intro: LocalizedText;
  code: string;
  note?: LocalizedText;
}

export interface ExerciseStep {
  kind: "exercise";
  id: string;
  from: "teacher";
  prompt: LocalizedText;
  starter: string;
  solution: string;
  hint: LocalizedText;
  fnName?: string;
  tests?: TestCase[];
  skipAutoTest?: boolean;
  difficulty?: Difficulty;
}

export interface QuizMCStep {
  kind: "quiz_mc";
  id: string;
  from: "teacher";
  question: LocalizedText;
  options: LocalizedText[];
  answer: number;
  explanation: LocalizedText;
}

export interface QuizTextStep {
  kind: "quiz_text";
  id: string;
  from: "teacher";
  question: LocalizedText;
  accept: string[];
  explanation: LocalizedText;
}

export interface RecallStep {
  kind: "recall";
  id: string;
  from: "teacher";
  prompt: LocalizedText;
  guideline: LocalizedText;
}

export interface CheckpointStep {
  kind: "checkpoint";
  id: string;
  from: "teacher";
  title: LocalizedText;
  body: LocalizedText;
}

export type LessonStep =
  | TeachStep
  | DemoStep
  | ExerciseStep
  | QuizMCStep
  | QuizTextStep
  | RecallStep
  | CheckpointStep;

export interface Day {
  id: number;
  title: LocalizedText;
  subtitle: LocalizedText;
  estimatedTime: LocalizedText;
  goals: LocalizedText[];
  youWillBuild: LocalizedText;
  steps: LessonStep[];
  finalTest: LessonStep[];
}

export interface DayProgress {
  started: boolean;
  stepIdx: number;
  completed: Record<string, boolean>;
  attempts: Record<string, number>;
  userAnswers: Record<string, string | number>;
  userCode: Record<string, string>;
  notes: string;
  testStarted: boolean;
  testStepIdx: number;
  testScore: number | null;
  testTotal: number;
  testPassed: boolean;
  completedAt: string | null;
}

export interface AppState {
  currentDay: number;
  progress: Record<number, DayProgress>;
}

export function emptyDayProgress(): DayProgress {
  return {
    started: false,
    stepIdx: 0,
    completed: {},
    attempts: {},
    userAnswers: {},
    userCode: {},
    notes: "",
    testStarted: false,
    testStepIdx: 0,
    testScore: null,
    testTotal: 0,
    testPassed: false,
    completedAt: null,
  };
}
