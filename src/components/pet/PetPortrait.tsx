import { useState } from 'react';
import { PawPrint } from 'lucide-react';
import type { PetId } from '@/content/petContract';

export function PetPortrait({ petId, size }: { petId: PetId; size: number }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <span
      aria-hidden="true"
      className="inline-grid shrink-0 place-items-center rounded-full text-[var(--world-700)]"
      style={{ width: size, height: size }}
    >
      {unavailable ? (
        <PawPrint size={Math.round(size * 0.53)} />
      ) : (
        <img
          src={`/pets/${petId}.webp`}
          width={size}
          height={size}
          alt=""
          draggable={false}
          className="h-full w-full object-contain"
          onError={() => setUnavailable(true)}
        />
      )}
    </span>
  );
}
