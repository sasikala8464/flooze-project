const KEY = "rb_admin_session";

export function saveSession(obj) {
  try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
}

export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

export function clearSession() {
  try { localStorage.removeItem(KEY); } catch (e) {}
}
