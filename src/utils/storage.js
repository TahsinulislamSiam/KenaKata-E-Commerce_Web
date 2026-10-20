// Safe localStorage JSON helpers — never throw in private mode / quota-full scenarios.
export function getStoredJSON(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setStoredJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — ignore */
  }
}

export function removeStored(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
