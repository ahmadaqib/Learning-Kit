import React from 'react';

interface ConfettiBurstProps {
  active: boolean;
}

const PIECES = Array.from({ length: 18 }, (_, idx) => ({
  id: idx,
  left: `${8 + ((idx * 17) % 84)}%`,
  delay: `${(idx % 6) * 110}ms`,
  color: ['#F5B400', '#E4572E', '#2BA84A', '#2F6FED', '#6C5CE7'][idx % 5],
}));

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden motion-reduce:hidden"
    >
      {PIECES.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 h-3 w-2 rounded-sm opacity-90"
          style={{
            left: p.left,
            backgroundColor: p.color,
            animation: `pw-confetti-fall 1350ms ease-out ${p.delay} forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes pw-confetti-fall {
          0% { transform: translateY(-16px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(75dvh) rotate(420deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
