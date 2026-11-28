/**
 * A random id for this browser, so the AI limits count per learner device instead of per network:
 * a whole class behind one school IP would otherwise share one learner's quota. It carries no personal data
 * and is easy to change, so it only splits limits; the WAF rule still caps each IP.
 */
const KEY = 'petualang-web-device-v1';
let memory = '';

export function deviceId(): string {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && /^[a-z0-9-]{16,64}$/.test(saved)) return saved;
    const fresh = crypto.randomUUID();
    localStorage.setItem(KEY, fresh);
    return fresh;
  } catch {
    // Storage blocked: one id for this tab.
    memory ||= crypto.randomUUID();
    return memory;
  }
}
