import React from 'react';
import { Check } from 'lucide-react';
import { formatLocalDate, getWeekDaysLocal } from '@/engine/date';

interface WeekDotsProps {
  weeks: Record<string, string[]>;
  weeklyTarget: 2 | 3 | 5;
  consecutiveWeeks: number;
}

export const WeekDots: React.FC<WeekDotsProps> = ({
  weeks,
  weeklyTarget,
  consecutiveWeeks,
}) => {
  const days = getWeekDaysLocal();
  const todayStr = formatLocalDate();
  const activeDates = new Set(Object.values(weeks).flat());
  const thisWeekCount = days.filter((d) => activeDates.has(d.date)).length;
  const reached = thisWeekCount >= weeklyTarget;

  return (
    <div className="pw-card p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="pw-kicker">MINGGU INI</span>
        <span className="pw-small font-bold text-[var(--ink-2)]">
          {thisWeekCount}/{weeklyTarget} hari {reached ? '✓' : ''}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        {days.map((day, idx) => {
          const done = activeDates.has(day.date);
          const isToday = day.date === todayStr;
          return (
            <div key={`${day.date}-${idx}`} className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold text-[var(--ink-2)]">{day.label}</span>
              <div
                aria-label={`${day.date}: ${done ? 'sudah belajar' : 'belum belajar'}`}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                  done
                    ? 'border-[var(--ok-500)] bg-[var(--ok-500)] text-white'
                    : isToday
                      ? 'border-[var(--world-600)] bg-[var(--world-50)]'
                      : 'border-[var(--line)] bg-[var(--cream)]'
                }`}
              >
                {done && <Check className="h-4 w-4" aria-hidden="true" />}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 pw-small text-[var(--ink-2)]">
        {consecutiveWeeks > 0
          ? `${consecutiveWeeks} minggu berturut-turut mencapai target!`
          : 'Minggu baru, petualangan baru.'}
      </p>
    </div>
  );
};
