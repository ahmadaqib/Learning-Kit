import React, { useEffect, useState } from 'react';
import { Eye, Play, RotateCcw, Sparkles } from 'lucide-react';
import type { Mode } from '@/content/schema';
import { markUserInteraction, playSound } from '@/engine/sound';
import { Button } from '@/components/ui/Button';

export interface SimComponentProps {
  mode: Mode;
  props?: Record<string, unknown>;
  onCompleteInteraction?: () => void;
}

const SimShell: React.FC<{
  title: string;
  mode: Mode;
  demoHint: string;
  onRunDemo: () => void;
  onReset: () => void;
  children: React.ReactNode;
}> = ({ title, demoHint, onRunDemo, onReset, children }) => {
  const [tab, setTab] = useState<'try' | 'example'>('try');

  return (
    <div className="space-y-3 rounded-[var(--radius-lg)] border-2 border-[var(--line)] bg-[var(--paper)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <span className="font-extrabold text-[var(--ink)]">{title}</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              markUserInteraction();
              setTab('example');
              onRunDemo();
            }}
            className={`pw-pressable inline-flex min-h-[40px] items-center gap-1.5 rounded-[var(--radius-full)] px-3.5 text-xs font-extrabold cursor-pointer ${
              tab === 'example'
                ? 'bg-[var(--world-600)] text-[var(--world-btn-text)] shadow-[0_2px_0_var(--world-700)]'
                : 'bg-[var(--cream)] text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Lihat Contoh
          </button>
          <button
            type="button"
            onClick={() => {
              markUserInteraction();
              setTab('try');
            }}
            className={`pw-pressable inline-flex min-h-[40px] items-center gap-1.5 rounded-[var(--radius-full)] px-3.5 text-xs font-extrabold cursor-pointer ${
              tab === 'try'
                ? 'bg-[var(--world-600)] text-[var(--world-btn-text)] shadow-[0_2px_0_var(--world-700)]'
                : 'bg-[var(--cream)] text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Coba Sendiri
          </button>
          <button
            type="button"
            onClick={() => {
              markUserInteraction();
              onReset();
            }}
            aria-label="Ulangi simulator"
            className="pw-pressable inline-flex min-h-[40px] items-center gap-1 rounded-[var(--radius-full)] bg-[var(--cream)] px-3.5 text-xs font-bold text-[var(--ink-2)] hover:text-[var(--ink)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Ulangi
          </button>
        </div>
      </div>
      {tab === 'example' && (
        <p className="rounded-[var(--radius-sm)] bg-[var(--world-50)] px-3 py-2 text-xs font-semibold text-[var(--world-700)]">
          Contoh otomatis: {demoHint}
        </p>
      )}
      {children}
    </div>
  );
};

/* A1: Restoran Web */
export const RestoranWebSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [stage, setStage] = useState<'idle' | 'request' | 'kitchen' | 'response'>('idle');
  const [dish, setDish] = useState('Halaman Produk');

  const runFlow = (selected: string) => {
    markUserInteraction();
    playSound('tap', true);
    setDish(selected);
    setStage('request');
    setTimeout(() => setStage('kitchen'), 360);
    setTimeout(() => {
      setStage('response');
      playSound('correct', true);
      onCompleteInteraction?.();
    }, 780);
  };

  return (
    <SimShell
      title="Restoran Web"
      mode={mode}
      demoHint="Memesan Halaman Produk lalu melihat pelayan menuju dapur dan membawa kembali response."
      onRunDemo={() => runFlow('Halaman Produk')}
      onReset={() => setStage('idle')}
    >
      <div className="grid gap-3 sm:grid-cols-3 text-center">
        <div
          className={`rounded-[var(--radius-md)] border-2 p-3 transition-[transform,border-color,background-color] duration-200 ease-[var(--ease-out)] ${
            stage === 'response'
              ? 'border-[var(--ok-500)] bg-[var(--ok-50)] shadow-md'
              : 'border-[var(--line)] bg-[var(--cream)]'
          }`}
        >
          <div className="text-xs font-bold text-[var(--ink-2)]">RUANG MAKAN (Frontend)</div>
          <div className="mt-2 font-extrabold">{dish}</div>
          <div className="mt-1 text-xs font-semibold">
            {stage === 'response' ? '✓ Tampil di layar' : 'Menunggu pesanan'}
          </div>
        </div>
        <div
          className={`rounded-[var(--radius-md)] border-2 p-3 transition-[transform,border-color,background-color,opacity] duration-200 ease-[var(--ease-out)] ${
            stage === 'request' || stage === 'response'
              ? 'border-[var(--world-600)] bg-[var(--world-50)] scale-[1.02] shadow-md'
              : 'border-[var(--world-600)] bg-[var(--world-50)] opacity-85'
          }`}
        >
          <div className="text-xs font-bold text-[var(--world-700)]">PELAYAN (Request/API)</div>
          <div className="mt-2 font-extrabold">
            {stage === 'idle' && 'Siap antar'}
            {stage === 'request' && '→ Membawa Request'}
            {stage === 'kitchen' && 'Menunggu dapur...'}
            {stage === 'response' && '← Membawa Response'}
          </div>
        </div>
        <div
          className={`rounded-[var(--radius-md)] border-2 p-3 text-[var(--on-boss)] transition-[transform,border-color] duration-200 ease-[var(--ease-out)] ${
            stage === 'kitchen'
              ? 'border-[var(--star)] bg-[var(--boss)] scale-[1.03] shadow-lg'
              : 'border-[var(--boss)] bg-[var(--boss)]'
          }`}
        >
          <div className="text-xs font-bold text-[var(--star)]">DAPUR (Backend)</div>
          <div className="mt-2 font-extrabold">
            {stage === 'kitchen' ? 'Mengolah data...' : stage === 'response' ? 'Data dikirim!' : 'Siap melayani'}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2.5 pt-2 sm:grid-cols-3">
        {['Halaman Produk', 'Daftar Harga', 'Keranjang'].map((item) => (
          <Button
            key={item}
            variant="secondary"
            onClick={() => runFlow(item)}
            className={`w-full text-sm ${
              dish === item && stage !== 'idle' ? 'border-[var(--world-600)] bg-[var(--world-50)]' : ''
            }`}
          >
            Pesan {item}
          </Button>
        ))}
      </div>
    </SimShell>
  );
};

/* A2: Rak Label HTML */
export const RakLabelHtmlSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const slots = [
    { key: 'header', desc: 'Logo & Judul Atas', expected: '<header>' },
    { key: 'nav', desc: 'Menu Beranda · Produk', expected: '<nav>' },
    { key: 'main', desc: 'Isi Utama Artikel', expected: '<main>' },
    { key: 'footer', desc: 'Hak Cipta di Bawah', expected: '<footer>' },
  ];
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [picked, setPicked] = useState<string | null>(null);

  const assign = (slotKey: string, tag: string) => {
    const next = { ...placed, [slotKey]: tag };
    setPlaced(next);
    setPicked(null);
    if (Object.keys(next).length >= 4) onCompleteInteraction?.();
  };

  return (
    <SimShell
      title="Rak Label HTML"
      mode={mode}
      demoHint="Menempelkan tag semantik <header>, <nav>, <main>, <footer> pada bagian halaman."
      onRunDemo={() => {
        setPlaced({ header: '<header>', nav: '<nav>', main: '<main>', footer: '<footer>' });
        onCompleteInteraction?.();
      }}
      onReset={() => {
        setPlaced({});
        setPicked(null);
      }}
    >
      <div className="flex flex-wrap gap-2">
        {['<header>', '<nav>', '<main>', '<footer>'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setPicked(picked === tag ? null : tag)}
            className={`pw-code min-h-[44px] rounded-[var(--radius-sm)] border-2 px-3 py-1.5 font-bold cursor-pointer ${
              picked === tag ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)] bg-[var(--cream)]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {slots.map((s) => {
          const val = placed[s.key];
          const ok = val === s.expected;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => picked && assign(s.key, picked)}
              className={`flex min-h-[48px] w-full items-center justify-between rounded-[var(--radius-md)] border-2 px-3 py-2 text-left cursor-pointer ${
                ok ? 'border-[var(--ok-500)] bg-[var(--ok-50)]' : 'border-dashed border-[var(--line)]'
              }`}
            >
              <span className="font-semibold">{s.desc}</span>
              <span className="pw-code font-bold text-[var(--world-700)]">{val ?? (picked ? 'Ketuk sini' : 'Kosong')}</span>
            </button>
          );
        })}
      </div>
    </SimShell>
  );
};

/* A3: Kupas Box Model */
export const KupasBoxModelSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [pad, setPad] = useState(14);
  const [bor, setBor] = useState(4);
  const [mar, setMar] = useState(12);

  return (
    <SimShell
      title="Kupas Box Model"
      mode={mode}
      demoHint="Menggeser slider padding, border, dan margin agar ruang lukisan berubah."
      onRunDemo={() => {
        setPad(22);
        setBor(6);
        setMar(20);
        onCompleteInteraction?.();
      }}
      onReset={() => {
        setPad(14);
        setBor(4);
        setMar(12);
      }}
    >
      <div className="rounded-[var(--radius-md)] bg-[var(--warn-50)] p-4 flex justify-center">
        <div
          style={{ margin: `${mar}px`, borderWidth: `${bor}px`, padding: `${pad}px` }}
          className="rounded-[var(--radius-sm)] border-solid border-[var(--ink)] bg-[var(--ok-50)]"
        >
          <div className="rounded-[var(--radius-xs)] bg-[var(--world-600)] px-4 py-2 font-extrabold text-[var(--world-btn-text)]">
            Lukisan (Content)
          </div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-xs font-bold">
          Padding: {pad}px
          <input
            type="range"
            min={4}
            max={28}
            value={pad}
            onChange={(e) => {
              setPad(Number(e.target.value));
              onCompleteInteraction?.();
            }}
            className="w-full"
          />
        </label>
        <label className="block text-xs font-bold">
          Border: {bor}px
          <input
            type="range"
            min={1}
            max={10}
            value={bor}
            onChange={(e) => {
              setBor(Number(e.target.value));
              onCompleteInteraction?.();
            }}
            className="w-full"
          />
        </label>
        <label className="block text-xs font-bold">
          Margin: {mar}px
          <input
            type="range"
            min={0}
            max={28}
            value={mar}
            onChange={(e) => {
              setMar(Number(e.target.value));
              onCompleteInteraction?.();
            }}
            className="w-full"
          />
        </label>
      </div>
    </SimShell>
  );
};

/* A3: Playground Flexbox */
export const PlaygroundFlexboxSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [justify, setJustify] = useState<'flex-start' | 'center' | 'space-between'>('flex-start');
  const [align, setAlign] = useState<'flex-start' | 'center' | 'flex-end'>('center');

  return (
    <SimShell
      title="Playground Flexbox"
      mode={mode}
      demoHint="Memilih justify-content: space-between dan align-items: center."
      onRunDemo={() => {
        setJustify('space-between');
        setAlign('center');
        onCompleteInteraction?.();
      }}
      onReset={() => {
        setJustify('flex-start');
        setAlign('center');
      }}
    >
      <div
        style={{ justifyContent: justify, alignItems: align }}
        className="flex h-28 gap-2 rounded-[var(--radius-md)] border-2 border-dashed border-[var(--world-600)] bg-[var(--world-50)] p-3"
      >
        {['Buku 1', 'Buku 2', 'Buku 3'].map((b) => (
          <div key={b} className="rounded-[var(--radius-sm)] bg-[var(--world-600)] px-3 py-2 text-xs font-extrabold text-[var(--world-btn-text)]">
            {b}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {(['flex-start', 'center', 'space-between'] as const).map((j) => (
          <button
            key={j}
            type="button"
            onClick={() => {
              setJustify(j);
              onCompleteInteraction?.();
            }}
            className={`pw-code min-h-[42px] rounded-[var(--radius-sm)] border px-3 text-xs font-bold cursor-pointer ${
              justify === j ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)]'
            }`}
          >
            {j}
          </button>
        ))}
        {(['flex-start', 'center', 'flex-end'] as const).map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => {
              setAlign(a);
              onCompleteInteraction?.();
            }}
            className={`pw-code min-h-[42px] rounded-[var(--radius-sm)] border px-3 text-xs font-bold cursor-pointer ${
              align === a ? 'border-[var(--ink)] bg-[var(--cream)]' : 'border-[var(--line)]'
            }`}
          >
            align: {a}
          </button>
        ))}
      </div>
    </SimShell>
  );
};

/* A4: Mesin Blender (Fungsi JS) */
export const MesinBlenderSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [fruit, setFruit] = useState('Mangga');
  const [cups, setCups] = useState(2);
  const [result, setResult] = useState<string | null>(null);

  const blend = (f: string, c: number) => {
    setFruit(f);
    setCups(c);
    setResult(`${c} gelas Jus ${f} Segar!`);
    onCompleteInteraction?.();
  };

  return (
    <SimShell
      title="Mesin Blender Fungsi"
      mode={mode}
      demoHint='Memanggil buatJus("Stroberi", 3) dan menerima nilai return.'
      onRunDemo={() => blend('Stroberi', 3)}
      onReset={() => setResult(null)}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-bold">
          Parameter 1 (Buah):
          <select
            value={fruit}
            onChange={(e) => setFruit(e.target.value)}
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper)] p-2"
          >
            <option value="Mangga">Mangga</option>
            <option value="Stroberi">Stroberi</option>
            <option value="Alpukat">Alpukat</option>
          </select>
        </label>
        <label className="text-xs font-bold">
          Parameter 2 (Jumlah Gelas):
          <input
            type="number"
            min={1}
            max={5}
            value={cups}
            onChange={(e) => setCups(Number(e.target.value) || 1)}
            className="mt-1 w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper)] p-2"
          />
        </label>
      </div>
      <div className="pw-code rounded-[var(--radius-sm)] bg-[var(--boss)] p-3 text-xs text-[var(--on-boss)]">
        buatJus("{fruit}", {cups}) → {result ? `"${result}"` : '(belum dipanggil)'}
      </div>
      <Button variant="primary" onClick={() => blend(fruit, cups)}>
        Putar Blender (Panggil Fungsi)
      </Button>
    </SimShell>
  );
};

/* A5: Penggeser Layar Responsif */
export const PenggeserLayarSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [width, setWidth] = useState(380);
  const cols = width >= 900 ? 3 : width >= 620 ? 2 : 1;
  const label = width >= 900 ? 'Laptop (3 kolom)' : width >= 620 ? 'Tablet (2 kolom)' : 'HP (1 kolom)';

  return (
    <SimShell
      title="Penggeser Layar Responsif"
      mode={mode}
      demoHint="Menggeser lebar ke 960px agar kartu berubah menjadi 3 kolom."
      onRunDemo={() => {
        setWidth(960);
        onCompleteInteraction?.();
      }}
      onReset={() => setWidth(380)}
    >
      <div className="flex items-center justify-between text-xs font-bold">
        <span>Lebar: {width}px</span>
        <span className="rounded-[var(--radius-full)] bg-[var(--world-50)] px-3 py-1 text-[var(--world-700)]">{label}</span>
      </div>
      <input
        type="range"
        min={340}
        max={1100}
        value={width}
        onChange={(e) => {
          setWidth(Number(e.target.value));
          onCompleteInteraction?.();
        }}
        className="w-full"
      />
      <div
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        className="grid gap-2 rounded-[var(--radius-md)] bg-[var(--cream)] p-3"
      >
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper)] p-3 text-center text-xs font-bold">
            Kartu {n}
          </div>
        ))}
      </div>
    </SimShell>
  );
};

/* A7: Hick Menu */
export const HickMenuSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [count, setCount] = useState<4 | 16>(4);
  const [startMs, setStartMs] = useState<number>(() => Date.now());
  const [elapsed, setElapsed] = useState<number | null>(null);

  const items = Array.from({ length: count }, (_, i) => (i === count - 2 ? 'Teh Hangat ★' : `Menu #${i + 1}`));

  const switchMode = (nextCount: 4 | 16) => {
    setCount(nextCount);
    setStartMs(Date.now());
    setElapsed(null);
  };

  return (
    <SimShell
      title="Uji Kecepatan Hick's Law"
      mode={mode}
      demoHint="Membandingkan mencari 'Teh Hangat ★' di 4 menu vs 16 menu."
      onRunDemo={() => {
        switchMode(4);
        onCompleteInteraction?.();
      }}
      onReset={() => switchMode(4)}
    >
      <div className="flex gap-2">
        <Button variant={count === 4 ? 'primary' : 'secondary'} onClick={() => switchMode(4)}>
          4 Menu
        </Button>
        <Button variant={count === 16 ? 'primary' : 'secondary'} onClick={() => switchMode(16)}>
          16 Menu
        </Button>
      </div>
      <p className="text-xs font-bold">Cari & ketuk: <span className="text-[var(--world-700)]">Teh Hangat ★</span></p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {items.map((it) => (
          <button
            key={it}
            type="button"
            onClick={() => {
              if (it.includes('Teh Hangat')) {
                setElapsed(Date.now() - startMs);
                onCompleteInteraction?.();
              }
            }}
            className="min-h-[44px] rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--cream)] px-2 text-xs font-bold cursor-pointer hover:border-[var(--world-600)]"
          >
            {it}
          </button>
        ))}
      </div>
      {elapsed !== null && (
        <p className="text-xs font-extrabold text-[var(--ok-600)]">
          Ketemu dalam {(elapsed / 1000).toFixed(2)} detik pada {count} pilihan!
        </p>
      )}
    </SimShell>
  );
};

/* A7: Fitts Target */
export const FittsTargetSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [hits, setHits] = useState<{ small: number; large: number }>({ small: 0, large: 0 });
  return (
    <SimShell
      title="Target Sentuh Fitts's Law"
      mode={mode}
      demoHint="Bandingkan kemudahan mengetuk tombol besar di bawah vs tombol kecil di pojok."
      onRunDemo={() => {
        setHits({ small: 1, large: 2 });
        onCompleteInteraction?.();
      }}
      onReset={() => setHits({ small: 0, large: 0 })}
    >
      <div className="relative h-36 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-3 flex flex-col justify-between">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setHits((h) => ({ ...h, small: h.small + 1 }));
              onCompleteInteraction?.();
            }}
            className="rounded-[var(--radius-xs)] border border-[var(--ink-3)] bg-[var(--paper)] px-2 py-0.5 text-[10px] cursor-pointer"
          >
            Kecil ({hits.small})
          </button>
        </div>
        <Button
          variant="primary"
          fullWidth
          onClick={() => {
            setHits((h) => ({ ...h, large: h.large + 1 }));
            onCompleteInteraction?.();
          }}
        >
          Tombol Besar Dekat Jempol ({hits.large})
        </Button>
      </div>
    </SimShell>
  );
};

/* A8: Roda Warna */
export const RodaWarnaSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [scheme, setScheme] = useState<'mono' | 'analog' | 'comp'>('mono');
  // The hex codes are the lesson (content, not theme), so they are written as digits and joined with '#'
  const toHex = (digits: string[]) => digits.map((d) => `#${d}`);
  const palettes = {
    mono: toHex(['12306E', '2F6FED', '6C97E8', 'EAF0FE']),
    analog: toHex(['2F6FED', '0E9AA7', '2BA84A']),
    comp: toHex(['2F6FED', 'FF8A00']),
  };
  return (
    <SimShell
      title="Pembuat Skema Roda Warna"
      mode={mode}
      demoHint="Memilih skema Komplementer yang menghasilkan kontras kuat untuk tombol aksi."
      onRunDemo={() => {
        setScheme('comp');
        onCompleteInteraction?.();
      }}
      onReset={() => setScheme('mono')}
    >
      <div className="flex flex-wrap gap-2">
        {([
          ['mono', 'Monokromatik'],
          ['analog', 'Analog'],
          ['comp', 'Komplementer'],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setScheme(id);
              onCompleteInteraction?.();
            }}
            className={`min-h-[44px] rounded-[var(--radius-sm)] border-2 px-3 text-xs font-bold cursor-pointer ${
              scheme === id ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {palettes[scheme].map((hex) => (
          <div key={hex} className="flex-1 rounded-[var(--radius-md)] border border-[var(--line)] p-3 text-center">
            <div className="h-12 w-full rounded-[var(--radius-sm)]" style={{ backgroundColor: hex }} />
            <span className="pw-code mt-1 block text-xs font-bold">{hex}</span>
          </div>
        ))}
      </div>
    </SimShell>
  );
};

/* A8: Detektif Kontras */
export const DetektifKontrasSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [picked, setPicked] = useState<string | null>(null);
  const pairs = [
    // The colour pairs are the lesson (content, not theme)
    { id: 'bad1', bg: `#${'E4E1DA'}`, fg: `#${'B8BCE0'}`, ratio: '1.4 : 1', pass: false },
    { id: 'ok', bg: `#${'1F2340'}`, fg: `#${'FFFFFF'}`, ratio: '15.2 : 1', pass: true },
    { id: 'bad2', bg: `#${'FFE082'}`, fg: `#${'FFFFFF'}`, ratio: '1.3 : 1', pass: false },
  ];
  return (
    <SimShell
      title="Detektif Kontras WCAG"
      mode={mode}
      demoHint="Memilih pasangan teks putih di atas navy gelap yang lolos rasio 4.5:1."
      onRunDemo={() => {
        setPicked('ok');
        onCompleteInteraction?.();
      }}
      onReset={() => setPicked(null)}
    >
      <div className="grid gap-2 sm:grid-cols-3">
        {pairs.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setPicked(p.id);
              if (p.pass) onCompleteInteraction?.();
            }}
            style={{ backgroundColor: p.bg, color: p.fg }}
            className="min-h-[68px] rounded-[var(--radius-md)] border-2 border-[var(--line)] p-3 font-extrabold cursor-pointer"
          >
            Teks Contoh
            {picked === p.id && (
              <span className="mt-1 block text-xs">
                {p.ratio} {p.pass ? '✓ Lolos AA' : '✗ Terlalu Pudar'}
              </span>
            )}
          </button>
        ))}
      </div>
    </SimShell>
  );
};

/* A9: Tombol Seribu Wajah */
export const TombolSeribuWajahSim: React.FC<SimComponentProps> = ({ mode, onCompleteInteraction }) => {
  const [state, setState] = useState<'default' | 'hover' | 'focus' | 'loading' | 'disabled'>('default');
  return (
    <SimShell
      title="Tombol Seribu Wajah (State UI)"
      mode={mode}
      demoHint="Mengganti state tombol menjadi loading dan focus agar terlihat perbedaannya."
      onRunDemo={() => {
        setState('loading');
        onCompleteInteraction?.();
      }}
      onReset={() => setState('default')}
    >
      <div className="flex flex-wrap gap-2">
        {(['default', 'hover', 'focus', 'loading', 'disabled'] as const).map((st) => (
          <button
            key={st}
            type="button"
            aria-pressed={state === st}
            onClick={() => {
              setState(st);
              onCompleteInteraction?.();
            }}
            className={`min-h-[48px] rounded-[var(--radius-sm)] border px-3 text-xs font-bold cursor-pointer ${
              state === st ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>
      <div className="flex justify-center rounded-[var(--radius-md)] bg-[var(--cream)] p-6">
        <Button
          variant="primary"
          loading={state === 'loading'}
          disabled={state === 'disabled'}
          className={`${state === 'hover' ? 'brightness-110' : ''} ${
            state === 'focus' ? 'outline outline-4 outline-[var(--world-700)] outline-offset-4' : ''
          }`}
        >
          {state === 'disabled' ? 'Tidak Aktif' : 'Simpan Pesanan'}
        </Button>
      </div>
    </SimShell>
  );
};

/* Simulator pendukung Jalur A (A6, A10, A11, A12) */
export const GenericTrackASim: React.FC<SimComponentProps & { variant: 'desa-ux' | 'taman-akses' | 'menara-alat' | 'benteng-xss' }> = ({
  mode,
  variant,
  onCompleteInteraction,
}) => {
  const [textInput, setTextInput] = useState('<script>alert("hai")</script>');
  const [safeMode, setSafeMode] = useState(true);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    setStepIdx(0);
  }, [variant]);

  if (variant === 'benteng-xss') {
    return (
      <SimShell
        title="Benteng Uji XSS (textContent vs innerHTML)"
        mode={mode}
        demoHint="Mengaktifkan mode aman textContent sehingga tulisan <script> tampil sebagai teks biasa."
        onRunDemo={() => {
          setSafeMode(true);
          onCompleteInteraction?.();
        }}
        onReset={() => {
          setTextInput('<script>alert("hai")</script>');
          setSafeMode(true);
        }}
      >
        <input
          type="text"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            onCompleteInteraction?.();
          }}
          className="pw-code w-full rounded-[var(--radius-sm)] border border-[var(--line)] p-2.5"
        />
        <div className="flex gap-2">
          <Button variant={safeMode ? 'primary' : 'secondary'} onClick={() => setSafeMode(true)}>
            Pakai textContent (Aman ✓)
          </Button>
          <Button variant={!safeMode ? 'danger' : 'secondary'} onClick={() => setSafeMode(false)}>
            Simulasi innerHTML (Bahaya)
          </Button>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-3 text-sm">
          {safeMode ? (
            <p>
              <strong>Tampilan Aman:</strong> {textInput}
            </p>
          ) : (
            <p className="font-bold text-[var(--err-600)]">
              Peringatan! Jika memakai innerHTML tanpa penyaringan, tag berbahaya di masukan bisa dijalankan browser!
            </p>
          )}
        </div>
      </SimShell>
    );
  }

  const labels: Record<string, string[]> = {
    'desa-ux': ['1. Empathize (Tanya pengguna)', '2. Define (Rumuskan)', '3. Prototype & Test'],
    'taman-akses': ['Perceivable (Alt gambar + Kontras)', 'Operable (Keyboard Tab)', 'Understandable (Pesan Jelas)'],
    'menara-alat': ['commit 1: Buat kerangka', 'branch: Fitur keranjang', 'merge & deploy tayang ✓'],
  };
  const steps = labels[variant] ?? labels['desa-ux'];

  return (
    <SimShell
      title={variant === 'menara-alat' ? 'Alur Titik Simpan Git' : variant === 'taman-akses' ? 'Pemeriksa Aksesibilitas' : 'Alur Kerja UX'}
      mode={mode}
      demoHint="Menelusuri langkah demi langkah alur kerja."
      onRunDemo={() => {
        setStepIdx(steps.length - 1);
        onCompleteInteraction?.();
      }}
      onReset={() => setStepIdx(0)}
    >
      <div className="space-y-2">
        {steps.map((s, idx) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setStepIdx(idx);
              onCompleteInteraction?.();
            }}
            className={`flex min-h-[44px] w-full items-center gap-2 rounded-[var(--radius-md)] border-2 px-3 text-left text-sm font-bold cursor-pointer ${
              idx <= stepIdx ? 'border-[var(--ok-500)] bg-[var(--ok-50)]' : 'border-[var(--line)]'
            }`}
          >
            <Sparkles className="h-4 w-4 text-[var(--world-700)]" aria-hidden="true" />
            <span>{s}</span>
          </button>
        ))}
      </div>
    </SimShell>
  );
};
