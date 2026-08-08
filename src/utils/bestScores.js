// Personal-best tracker using localStorage.
// Keys look like "journey-3" or "quickplay-medium", values are the
// fewest attempts used to win that level/difficulty.

const STORAGE_KEY = "number-hunt-best";

function loadScores() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    // If localStorage is unavailable or corrupted, start fresh
    return {};
  }
}

function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

// Returns the best score for a key, or null if never completed
export function getBest(key) {
  return loadScores()[key] ?? null;
}

// Try to save a new score. Returns true only if it's a new personal best.
export function trySaveBest(key, attemptsUsed) {
  const scores = loadScores();
  const prev = scores[key];

  if (prev === null || attemptsUsed < prev) {
    scores[key] = attemptsUsed;
    saveScores(scores);
    return true; // New record!
  }
  return false;
}
