/**
 * Helper tanggal lokal perangkat (tanpa bergantung pada UTC/server).
 */

export function formatLocalDate(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function addDaysLocal(dateStr: string, days: number): string {
  const dt = parseLocalDate(dateStr);
  dt.setDate(dt.getDate() + days);
  return formatLocalDate(dt);
}

export function diffDaysLocal(fromStr: string, toStr: string): number {
  const a = parseLocalDate(fromStr);
  const b = parseLocalDate(toStr);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

/**
 * Menghitung kode minggu ISO lokal, mis. "2026-W47".
 */
export function getIsoWeekKey(dateInput: Date | string = new Date()): string {
  const d = typeof dateInput === 'string' ? parseLocalDate(dateInput) : new Date(dateInput);
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const dayNum = date.getDay() || 7;
  date.setDate(date.getDate() + 4 - dayNum);
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

/**
 * Mengembalikan 7 tanggal Senin–Minggu untuk minggu dari tanggal acuan.
 */
export function getWeekDaysLocal(refDate: Date = new Date()): { label: string; date: string }[] {
  const day = refDate.getDay(); // 0=Minggu, 1=Senin ...
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate() + diffToMonday);
  const labels = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];
  return labels.map((label, idx) => {
    const cur = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + idx);
    return { label, date: formatLocalDate(cur) };
  });
}

/**
 * Menghitung berapa minggu berturut-turut target mingguan tercapai hingga minggu ini / minggu lalu.
 */
export function getConsecutiveTargetWeeks(
  weeks: Record<string, string[]>,
  weeklyTarget: number,
  today: Date = new Date(),
): number {
  const currentKey = getIsoWeekKey(today);
  const prevDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  let cursorDate = prevDate;
  let streak = 0;

  // Jika minggu ini sudah mencapai target, hitung dari minggu ini
  if ((weeks[currentKey]?.length ?? 0) >= weeklyTarget) {
    streak += 1;
  }

  for (let i = 0; i < 104; i += 1) {
    const key = getIsoWeekKey(cursorDate);
    if ((weeks[key]?.length ?? 0) >= weeklyTarget) {
      streak += 1;
      cursorDate = new Date(cursorDate.getFullYear(), cursorDate.getMonth(), cursorDate.getDate() - 7);
    } else {
      break;
    }
  }

  return streak;
}
