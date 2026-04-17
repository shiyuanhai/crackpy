import type {
  CheckpointStep,
  DemoStep,
  ExerciseStep,
  QuizMCStep,
  QuizTextStep,
  RecallStep,
  TeachStep,
  TestCase,
} from "../types";

export function teach(id: string, text: string): TeachStep {
  return { kind: "teach", id, from: "teacher", text };
}

export function demo(id: string, intro: string, code: string, note?: string): DemoStep {
  return { kind: "demo", id, from: "teacher", intro, code, note };
}

export function exercise(
  id: string,
  prompt: string,
  starter: string,
  solution: string,
  hint: string,
  tests?: TestCase[],
  opts: { fnName?: string; skipAutoTest?: boolean } = {},
): ExerciseStep {
  return {
    kind: "exercise",
    id,
    from: "teacher",
    prompt,
    starter,
    solution,
    hint,
    tests,
    ...opts,
  };
}

export function quizMC(
  id: string,
  question: string,
  options: string[],
  answer: number,
  explanation: string,
): QuizMCStep {
  return { kind: "quiz_mc", id, from: "teacher", question, options, answer, explanation };
}

export function quizText(
  id: string,
  question: string,
  accept: string[],
  explanation: string,
): QuizTextStep {
  return { kind: "quiz_text", id, from: "teacher", question, accept, explanation };
}

export function recall(id: string, prompt: string, guideline: string): RecallStep {
  return { kind: "recall", id, from: "teacher", prompt, guideline };
}

export function checkpoint(id: string, title: string, body: string): CheckpointStep {
  return { kind: "checkpoint", id, from: "teacher", title, body };
}
