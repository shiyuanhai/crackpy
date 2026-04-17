import type { AppState, DayProgress } from "./types";
import { emptyDayProgress } from "./types";

const STORAGE_KEY = "crackpy_v2";

const initialState: AppState = {
  currentDay: 1,
  progress: {},
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
    window.localStorage.removeItem("crackpy_v1");
  } catch {}
}

export function getOrInitProgress(
  state: AppState,
  dayId: number,
): DayProgress {
  return state.progress[dayId] ?? emptyDayProgress();
}
