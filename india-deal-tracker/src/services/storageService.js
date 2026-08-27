// Single Responsibility: All persistence logic in one place
// Liskov Substitution: storageGet/storageSet work with any JSON-serializable value

const MAX_RECENT = 8;

// ─── Persistent storage (cross-session via window.storage) ───────────────────
export async function storageGet(key) {
  try {
    const result = await window.storage.get(key);
    return result ? JSON.parse(result.value) : null;
  } catch {
    return null;
  }
}

export async function storageSet(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value));
  } catch {
    // Storage unavailable — fail silently, app still works
  }
}

// ─── Session storage (tab-switch persistence) ─────────────────────────────────
export function sessionGet(key, fallback = null) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function sessionSet(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Session storage unavailable — fail silently
  }
}

// ─── Watchlist helpers ────────────────────────────────────────────────────────
export async function loadWatchlist()  { return (await storageGet("watchlist")) || []; }
export async function saveWatchlist(list) { await storageSet("watchlist", list); }

export function toggleInWatchlist(list, item) {
  return list.includes(item)
    ? list.filter((w) => w !== item)
    : [item, ...list];
}

// ─── Recent searches helpers ──────────────────────────────────────────────────
export async function loadRecentSearches()  { return (await storageGet("recent_searches")) || []; }
export async function saveRecentSearches(list) { await storageSet("recent_searches", list); }

export function addToRecent(list, query) {
  return [query, ...list.filter((r) => r !== query)].slice(0, MAX_RECENT);
}
