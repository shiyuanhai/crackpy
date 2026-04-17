import type { LocalizedText } from "../i18n";
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

export function teach(id: string, text: LocalizedText): TeachStep {
  return { kind: "teach", id, from: "teacher", text };
}

export function demo(
  id: string,
  intro: LocalizedText,
  code: string,
  note?: LocalizedText,
): DemoStep {
  return { kind: "demo", id, from: "teacher", intro, code, note };
}

export function exercise(
  id: string,
  prompt: LocalizedText,
  starter: string,
  solution: string,
  hint: LocalizedText,
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
  question: LocalizedText,
  options: LocalizedText[],
  answer: number,
  explanation: LocalizedText,
): QuizMCStep {
  return { kind: "quiz_mc", id, from: "teacher", question, options, answer, explanation };
}

export function quizText(
  id: string,
  question: LocalizedText,
  accept: string[],
  explanation: LocalizedText,
): QuizTextStep {
  return { kind: "quiz_text", id, from: "teacher", question, accept, explanation };
}

export function recall(id: string, prompt: LocalizedText, guideline: LocalizedText): RecallStep {
  return { kind: "recall", id, from: "teacher", prompt, guideline };
}

export function checkpoint(
  id: string,
  title: LocalizedText,
  body: LocalizedText,
): CheckpointStep {
  return { kind: "checkpoint", id, from: "teacher", title, body };
}
