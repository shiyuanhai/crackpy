import type { AppState } from "./types";

const STORAGE_KEY = "crackpy_v1";

const initialState: AppState = {
  currentDay: 1,
  progress: {},
  savedCode: {},
};

export function loadState(): AppState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return {
      currentDay: parsed.currentDay ?? 1,
      progress: parsed.progress ?? {},
      savedCode: parsed.savedCode ?? {},
    };
  } catch {
    return initialState;
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota errors */
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
