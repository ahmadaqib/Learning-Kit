import { useState, type Ref } from 'react';
import { PawPrint } from 'lucide-react';
import type { PetId } from '@/content/petContract';
import { usePetMotion, type PetMotion } from './usePetMotion';

function PetFigure({ petId, size, figureRef }: { petId: PetId; size: number; figureRef?: Ref<HTMLSpanElement> }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <span
      ref={figureRef}
      data-pet-figure=""
      className="grid place-items-center text-[var(--world-700)]"
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
          className="h-full w-full rounded-full object-contain"
          onError={() => setUnavailable(true)}
        />
      )}
    </span>
  );
}

function MovingPetFigure({ petId, size, motion }: { petId: PetId; size: number; motion: PetMotion }) {
  const figure = usePetMotion(petId, motion);
  return <PetFigure petId={petId} size={size} figureRef={figure} />;
}

export function PetPortrait({ petId, size, motion }: { petId: PetId; size: number; motion?: PetMotion }) {
  const figureSize = Math.round(size * 0.70);

  return (
    <span
      aria-hidden="true"
      data-pet-portrait={petId}
      className="pointer-events-none inline-grid shrink-0 place-items-center overflow-hidden"
      style={{ width: size, height: size }}
    >
      {motion
        ? <MovingPetFigure key={petId} petId={petId} size={figureSize} motion={motion} />
        : <PetFigure key={petId} petId={petId} size={figureSize} />}
    </span>
  );
}
