import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { Check, Lock } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { WORLD_META_BY_ID, WORLD_METAS, type WorldMeta } from '@/content/worldMeta';
import { resolveTxt, type Profile } from '@/content/schema';
import { getWorldStarStats, isWorldUnlocked } from '@/engine/unlock';
import { hasSeen, markSeen } from '@/engine/seen';
import { getMotionPrefs } from '@/motion/prefs';
import { stickerTilt } from '@/motion/tokens';
import { useAppStore } from '@/store/useAppStore';
import {
  LESSON_STUBS,
  MapPath,
  SPREAD_NARROW,
  SPREAD_WIDE,
  WORLD_STUBS,
  getMapHeight,
  getNodeCenters,
  getPathCount,
  pathSeenKey,
  type MapPathSegment,
} from '@/components/map/MapPath';
import { WorldNode, type WorldNodeState } from '@/components/map/WorldNode';
import { Doodle, type DoodleName } from '@/components/fx/Doodle';
import { PetLauncher } from '@/components/pet/PetLauncher';
import { Button } from '@/components/ui/Button';
import { Poster, PosterHeading } from '@/components/ui/Poster';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

const WIDE_QUERY = '(min-width: 640px)';

/** 56 px from the centre line on phones, 88 px from 640 px wide (spec 8.3). */
function useMapSpread(): number {
  const wide = useSyncExternalStore(
    (onChange) => {
      const mql = typeof window.matchMedia === 'function' ? window.matchMedia(WIDE_QUERY) : null;
      mql?.addEventListener?.('change', onChange);
      return () => mql?.removeEventListener?.('change', onChange);
    },
    () => (typeof window.matchMedia === 'function' ? window.matchMedia(WIDE_QUERY).matches : false),
    () => false,
  );
  return wide ? SPREAD_WIDE : SPREAD_NARROW;
}

/**
 * The track switch is a route change, and the route wrapper remounts the page on it. To still slide the pill
 * (M09), the unmounting map leaves a note of the track it showed. The next map that mounts within 400 ms starts
 * its pill there and moves it on the following frames. Anything older is a fresh visit: no slide.
 */
let lastTrackShown: { track: 'A' | 'B'; at: number } | null = null;

const TRACK_TITLE: Record<'A' | 'B', string> = {
  A: 'Jalur A: Membangun Tampilan',
  B: 'Jalur B: Aplikasi Saling Bicara',
};

/** At most four tiny static terrain doodles (Junior only). They sit in the gaps between rows, on the outer edge. */
const TERRAIN: DoodleName[] = ['sprout', 'spark', 'sprout', 'spark'];

/** Who has to be passed first. Names the guardians, so the message carries no world code in Junior. */
function guardianNamesFor(wm: WorldMeta, mode: Profile['mode']): string {
  let ids: string[];
  if (wm.id === 'b01') ids = mode === 'junior' ? ['a01'] : ['a01', 'a04'];
  else if (wm.requires.length > 0) ids = wm.requires;
  else {
    const prev = WORLD_METAS.filter((w) => w.track === wm.track && w.order < wm.order).sort((a, b) => b.order - a.order)[0];
    ids = prev ? [prev.id] : [];
  }
  return ids.map((id) => WORLD_META_BY_ID[id]?.guardianName ?? `Penjaga ${id.toUpperCase()}`).join(' dan ');
}

export const MapPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  if (!profile) return null;
  return <MapContent profile={profile} />;
};

const MapContent: React.FC<{ profile: Profile }> = ({ profile }) => {
  const { jalur = 'A' } = useParams<{ jalur: string }>();
  const track: 'A' | 'B' = jalur.toUpperCase() === 'B' ? 'B' : 'A';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const baru = searchParams.get('baru');
  const spread = useMapSpread();

  const [selectedWorldId, setSelectedWorldId] = useState<string | null>(null);
  const [lockedTip, setLockedTip] = useState<string | null>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Worlds of this track in order: index 0 is the first world, at the bottom of the map.
  const trackWorlds = useMemo(
    () => WORLD_METAS.filter((w) => w.track === track).sort((a, b) => a.order - b.order),
    [track],
  );

  // What changed since the last visit. Read once on mount, so that marking things seen below does not cancel the
  // motion that is about to play, and so that a second render in Strict Mode sees the same plan (M15, M37).
  const [plan] = useState(() => {
    const segments: MapPathSegment[] = [];
    const reveal = new Set<string>();
    const mark: string[] = [];
    trackWorlds.forEach((wm, k) => {
      const stub = WORLD_STUBS.find((s) => s.id === wm.id)!;
      const { count, total } = getPathCount(wm, profile);
      let prev = count;
      if (!hasSeen(profile.id, pathSeenKey(wm.id, count))) {
        prev = 0;
        for (let c = count - 1; c >= 0; c -= 1) {
          if (hasSeen(profile.id, pathSeenKey(wm.id, c))) {
            prev = c;
            break;
          }
        }
        mark.push(pathSeenKey(wm.id, count));
      }
      if (k < trackWorlds.length - 1) {
        segments.push({ world: wm, progress: count / total, prevProgress: prev / total });
      }
      if (isWorldUnlocked(stub, profile, WORLD_STUBS) && !hasSeen(profile.id, `unlock:world:${wm.id}`)) {
        reveal.add(wm.id);
        mark.push(`unlock:world:${wm.id}`);
      }
    });
    return { segments, reveal, mark };
  });

  useEffect(() => {
    plan.mark.forEach((key) => markSeen(profile.id, key));
  }, [plan, profile.id]);

  const nodes = trackWorlds.map((wm) => {
    const stub = WORLD_STUBS.find((s) => s.id === wm.id)!;
    const unlocked = isWorldUnlocked(stub, profile, WORLD_STUBS);
    const passed = Boolean(profile.bosses[wm.id]?.passed);
    const state: WorldNodeState = !unlocked ? 'locked' : passed ? 'done' : 'current';
    const stars = getWorldStarStats(stub, LESSON_STUBS, profile);
    return { wm, unlocked, state, stars };
  });
  const currentId = nodes.find((n) => n.state === 'current')?.wm.id;
  const centers = getNodeCenters(trackWorlds.length, spread);
  const height = getMapHeight(trackWorlds.length);

  // M16: jump to the current node on mount with 'auto'. Smooth only for a world that was just unlocked (?baru=)
  // and only when motion is not reduced.
  useEffect(() => {
    const target =
      baru && trackWorlds.some((w) => w.id === baru) ? baru : (currentId ?? trackWorlds[trackWorlds.length - 1]?.id);
    const smooth = Boolean(baru) && !getMotionPrefs().reduced;
    if (target) nodeRefs.current[target]?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
    // On mount and when the track changes only (the route wrapper remounts the page on a track switch anyway).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  // Track switch pill (M09)
  const [pillTrack, setPillTrack] = useState<'A' | 'B'>(() =>
    lastTrackShown && performance.now() - lastTrackShown.at < 400 ? lastTrackShown.track : track,
  );
  useLayoutEffect(() => {
    let id2 = 0;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setPillTrack(track));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
      lastTrackShown = { track, at: performance.now() };
    };
  }, [track]);

  const selectedMeta =
    (selectedWorldId && trackWorlds.find((w) => w.id === selectedWorldId)) ||
    trackWorlds.find((w) => w.id === currentId) ||
    trackWorlds[0];

  const junior = profile.mode === 'junior';

  const onPressNode = (wm: WorldMeta, unlocked: boolean) => {
    if (!unlocked) {
      setLockedTip(`Terkunci. Selesaikan ${guardianNamesFor(wm, profile.mode)} untuk membuka ${wm.title}.`);
      return;
    }
    setLockedTip(null);
    setSelectedWorldId(wm.id);
    if (window.innerWidth < 1024) navigate(`/dunia/${wm.id}`);
  };

  const terrain: Array<{ name: DoodleName; x: number; y: number }> = [];
  if (junior) {
    for (let k = 1; k < trackWorlds.length && terrain.length < TERRAIN.length; k += 3) {
      terrain.push({
        name: TERRAIN[terrain.length],
        x: (centers[k].x > 0 ? 1 : -1) * (spread + 84),
        y: (centers[k].y + centers[k - 1].y) / 2,
      });
    }
  }

  return (
    <WorldThemeWrapper
      worldId={selectedMeta?.id ?? 'a01'}
      className="mx-auto max-w-[1080px] px-[var(--screen-pad)] py-6 sm:px-6"
    >
      <StorageWarningBanner />

      <header className="mb-[var(--gap-group)] flex flex-wrap items-center justify-between gap-[var(--gap-stack)]">
        <div className="min-w-0">
          <span className="pw-kicker">Peta petualangan</span>
          <h1 className="pw-h1">{TRACK_TITLE[track]}</h1>
        </div>

        {/* Segmented control on --paper-2 with a sliding pill (M09): transform 160 ms, colours 140 ms */}
        <div className="flex flex-wrap items-center gap-2">
          <nav aria-label="Pilih jalur">
            <div className="relative inline-grid grid-cols-2 rounded-full bg-[var(--paper-2)] p-1">
              <span
                aria-hidden="true"
                className="pw-t-move absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-[var(--paper-raised)] shadow-[var(--elev-1)]"
                style={{ transform: pillTrack === 'A' ? 'translateX(0)' : 'translateX(100%)' }}
              />
              {(['A', 'B'] as const).map((t) => (
                <Link
                  key={t}
                  to={`/peta/${t}`}
                  aria-current={track === t ? 'page' : undefined}
                  className={`pw-t-colors relative z-10 inline-flex min-h-[var(--touch-min)] items-center justify-center whitespace-nowrap rounded-full px-5 text-center text-sm font-extrabold ${
                    track === t ? 'text-[var(--ink)]' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
                  }`}
                >
                  {junior ? (t === 'A' ? 'Tampilan' : 'API') : `Jalur ${t} · ${t === 'A' ? 'Tampilan' : 'API'}`}
                </Link>
              ))}
            </div>
          </nav>
          <PetLauncher context={{ surface: 'map' }} />
        </div>
      </header>

      {lockedTip && (
        <div role="status" className="pw-well mb-[var(--gap-stack)] flex items-start gap-2 font-bold">
          <Lock className="mt-1 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="pw-small">{lockedTip}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[var(--gap-group)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col items-center">
          {/* The map: a fixed 148 px rhythm and the dot grid in --line behind it. Nodes are placed from constants. */}
          <div
            className="relative w-full overflow-x-clip"
            style={{
              height,
              maxWidth: 640,
              backgroundImage: 'radial-gradient(var(--line) 1.2px, transparent 1.3px)',
              backgroundSize: '18px 18px',
            }}
          >
            <MapPath segments={plan.segments} count={trackWorlds.length} spread={spread} />

            {terrain.map((d, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{ left: `clamp(12px, 50% + ${d.x}px, 100% - 12px)`, top: d.y, translate: '-50% -50%' }}
              >
                <Doodle name={d.name} width={22} />
              </span>
            ))}

            {nodes.map(({ wm, unlocked, state, stars }, k) => (
              <WorldNode
                key={wm.id}
                meta={wm}
                index={k}
                side={centers[k].x < 0 ? 'left' : 'right'}
                state={state}
                earned={stars.earned}
                max={stars.max}
                mode={profile.mode}
                selected={selectedMeta?.id === wm.id}
                reveal={plan.reveal.has(wm.id)}
                soundEnabled={profile.settings.soundEnabled}
                cx={centers[k].x}
                cy={centers[k].y}
                nodeRef={(el) => {
                  nodeRefs.current[wm.id] = el;
                }}
                onPress={() => onPressNode(wm, unlocked)}
              />
            ))}
          </div>
        </div>

        {/* Wide screens: the side panel is a world poster with a compact trail and one primary button */}
        {selectedMeta && (
          <aside className="hidden lg:block" aria-label={`Ringkasan dunia ${selectedMeta.title}`}>
            <WorldThemeWrapper worldId={selectedMeta.id} className="sticky top-6">
              <Poster className="space-y-[var(--gap-stack)]">
                <PosterHeading
                  worldId={selectedMeta.id}
                  worldTitle={selectedMeta.title}
                  tilt={stickerTilt(trackWorlds.indexOf(selectedMeta))}
                >
                  <span className="pw-kicker">{junior ? 'Dunia' : `Dunia ${selectedMeta.id.toUpperCase()}`}</span>
                  <h2 className="pw-h2">{selectedMeta.title}</h2>
                </PosterHeading>
                <p className="pw-body">{resolveTxt(selectedMeta.tagline, profile.mode)}</p>
                <ol className="m-0 list-none space-y-1 p-0">
                  {selectedMeta.lessons
                    .filter((l) => l.modes.includes(profile.mode))
                    .map((l, i) => {
                      const done = Boolean(profile.lessons[l.id]?.completedAt);
                      return (
                        <li key={l.id} className="pw-small flex items-center gap-2 py-1 font-semibold">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--on-poster)] text-xs font-extrabold"
                          >
                            {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                          </span>
                          <span className="min-w-0 flex-1">{l.title}</span>
                          {done && <span className="visually-hidden">, selesai</span>}
                        </li>
                      );
                    })}
                </ol>
                <Button variant="inverse" fullWidth onClick={() => navigate(`/dunia/${selectedMeta.id}`)}>
                  Buka {selectedMeta.title} →
                </Button>
              </Poster>
            </WorldThemeWrapper>
          </aside>
        )}
      </div>
    </WorldThemeWrapper>
  );
};
