import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { CountUp } from '@/components/fx/CountUp';
import { Doodle } from '@/components/fx/Doodle';
import { formatLocalDate, getIsoWeekKey, getWeekDaysLocal } from '@/engine/date';
import { hasSeen, markSeen } from '@/engine/seen';
import { useMotionPrefs } from '@/motion/prefs';
import { useAppStore } from '@/store/useAppStore';

interface WeekDotsProps {
  weeks: Record<string, string[]>;
  weeklyTarget: 2 | 3 | 5;
  /**
   * Consecutive weeks that reached the target. The line renders only when the page passes a number above 0,
   * and only in Pro: Junior never shows a count that could fall back to zero (spec 8.2).
   */
  consecutiveWeeks?: number;
  /** Defaults to the active profile. Used for the "played already" keys in seen.ts. */
  profileId?: string;
}

const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

/**
 * The week strip on Home. Today's dot stamps in once per day (M33, key `day:{date}`) and the weekly target
 * plays its wave once per week (M34, 5.9.5 G, key `week:{isoWeek}`). Both are decided when the strip mounts
 * and recorded right after, so they replay neither on a re-render nor on the next visit.
 * Status is never colour alone: a done day carries a tick, today carries a ring, and each has hidden text.
 */
export const WeekDots: React.FC<WeekDotsProps> = ({ weeks, weeklyTarget, consecutiveWeeks, profileId }) => {
  const { mode } = useMotionPrefs();
  const storeProfileId = useAppStore((s) => s.activeProfileId);
  const pid = profileId ?? storeProfileId;

  const days = getWeekDaysLocal();
  const todayStr = formatLocalDate();
  const weekKey = getIsoWeekKey();
  const activeDates = new Set(Object.values(weeks).flat());
  const thisWeekCount = days.filter((d) => activeDates.has(d.date)).length;
  const reached = thisWeekCount >= weeklyTarget;
  const todayDone = activeDates.has(todayStr);
  const left = Math.max(0, weeklyTarget - thisWeekCount);

  // Decided once, on mount, from what the learner has not seen yet.
  const [play] = useState(() => ({
    day: Boolean(pid) && todayDone && !hasSeen(pid, `day:${todayStr}`),
    week: Boolean(pid) && reached && !hasSeen(pid, `week:${weekKey}`),
  }));

  useEffect(() => {
    if (!pid) return;
    if (play.day) markSeen(pid, `day:${todayStr}`);
    if (play.week) markSeen(pid, `week:${weekKey}`);
  }, [pid, play.day, play.week, todayStr, weekKey]);

  const showConsecutive = mode === 'pro' && typeof consecutiveWeeks === 'number' && consecutiveWeeks > 0;

  return (
    <div className="pw-card p-[var(--space-card)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="pw-kicker">
          Minggu ini · {thisWeekCount} dari {weeklyTarget} hari
        </span>
        {reached && <Check className="h-5 w-5 text-[var(--ok-600)]" aria-hidden="true" />}
      </div>

      <ul className="m-0 grid list-none grid-cols-7 gap-1 overflow-x-clip p-0 [overflow-clip-margin:8px]">
        {days.map((day, idx) => {
          const done = activeDates.has(day.date);
          const isToday = day.date === todayStr;
          const stampIt = play.day && isToday && done;
          return (
            <li
              key={`${day.date}-${idx}`}
              className={`flex min-w-0 flex-col items-center gap-1.5 ${play.week ? 'pw-fx-hop' : ''}`}
              style={play.week ? ({ '--at': `${200 + idx * 45}ms` } as React.CSSProperties) : undefined}
            >
              <span className="text-xs font-bold text-[var(--ink-2)]" aria-hidden="true">
                {day.label}
              </span>
              <span
                className={`flex aspect-square w-full max-w-7 items-center justify-center rounded-full border-2 pw-t-colors ${
                  done
                    ? 'border-[var(--ok-600)] bg-[var(--ok-500)] text-white'
                    : isToday
                      ? 'border-[var(--world-600)] bg-[var(--world-50)]'
                      : 'border-[var(--line)] bg-[var(--paper-2)]'
                } ${isToday ? 'outline outline-2 outline-offset-2 outline-[var(--world-600)]' : ''} ${
                  stampIt ? 'pw-fx-stamp pw-fx-ring' : ''
                }`}
                style={
                  stampIt
                    ? ({ '--stamp-from': 1.6, '--ring-color': 'var(--ok-500)' } as React.CSSProperties)
                    : undefined
                }
              >
                {done && <Check className="h-4 w-4 max-h-[65%] max-w-[65%]" strokeWidth={3} aria-hidden="true" />}
              </span>
              <span className="visually-hidden">
                {DAY_NAMES[idx]}
                {isToday ? ', hari ini' : ''}: {done ? 'sudah belajar' : 'belum belajar'}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 flex items-end justify-between gap-3">
        <p
          className={`pw-small m-0 text-[var(--ink-2)] ${play.week ? 'pw-fx-fade' : ''}`}
          style={play.week ? ({ '--at': '560ms' } as React.CSSProperties) : undefined}
        >
          {reached
            ? mode === 'pro'
              ? 'Target minggu ini tercapai.'
              : 'Target minggu ini tercapai!'
            : thisWeekCount === 0
              ? 'Minggu baru, petualangan baru.'
              : `Tinggal ${left} hari lagi.`}
          {showConsecutive && (
            <>
              {' '}
              <span className="font-mono font-bold text-[var(--ink)]">
                <CountUp value={consecutiveWeeks} duration={400} delay={play.week ? 560 : 0} skip={!play.week} />
              </span>{' '}
              minggu berturut-turut
            </>
          )}
        </p>
        {reached && mode === 'junior' && (
          <span
            className={`inline-flex flex-shrink-0 ${play.week ? 'pw-fx-grow' : ''}`}
            style={play.week ? ({ '--at': '480ms' } as React.CSSProperties) : undefined}
          >
            <Doodle name="sprout" width={26} />
          </span>
        )}
      </div>
    </div>
  );
};
