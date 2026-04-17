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
  text: string;
}

export interface DemoStep {
  kind: "demo";
  id: string;
  from: "teacher";
  intro: string;
  code: string;
  note?: string;
}

export interface ExerciseStep {
  kind: "exercise";
  id: string;
  from: "teacher";
  prompt: string;
  starter: string;
  solution: string;
  hint: string;
  fnName?: string;
  tests?: TestCase[];
  skipAutoTest?: boolean;
  difficulty?: Difficulty;
}

export interface QuizMCStep {
  kind: "quiz_mc";
  id: string;
  from: "teacher";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface QuizTextStep {
  kind: "quiz_text";
  id: string;
  from: "teacher";
  question: string;
  accept: string[];
  explanation: string;
}

export interface RecallStep {
  kind: "recall";
  id: string;
  from: "teacher";
  prompt: string;
  guideline: string;
}

export interface CheckpointStep {
  kind: "checkpoint";
  id: string;
  from: "teacher";
  title: string;
  body: string;
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
  title: string;
  subtitle: string;
  estimatedTime: string;
  goals: string[];
  youWillBuild: string;
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
