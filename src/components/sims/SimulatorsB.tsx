import React, { useState } from 'react';
import { Bell, Eye, Play, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react';
import { mockFetch, type MockResponse } from '@/content/mock-api/mockFetch';
import type { SimComponentProps } from './SimulatorsA';
import { Button } from '@/components/ui/Button';

const SimShellB: React.FC<{
  title: string;
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
              setTab('example');
              onRunDemo();
            }}
            className={`pw-pressable inline-flex min-h-[40px] items-center gap-1 rounded-[var(--radius-full)] px-3.5 text-xs font-extrabold cursor-pointer ${
              tab === 'example'
                ? 'pw-squish-pop bg-[var(--world-600)] text-[var(--world-btn-text)] shadow-[0_2px_0_var(--world-700)]'
                : 'bg-[var(--cream)] text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Lihat Contoh
          </button>
          <button
            type="button"
            onClick={() => setTab('try')}
            className={`pw-pressable inline-flex min-h-[40px] items-center gap-1 rounded-[var(--radius-full)] px-3.5 text-xs font-extrabold cursor-pointer ${
              tab === 'try'
                ? 'pw-squish-pop bg-[var(--world-600)] text-[var(--world-btn-text)] shadow-[0_2px_0_var(--world-700)]'
                : 'bg-[var(--cream)] text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Coba
          </button>
          <button
            type="button"
            onClick={onReset}
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

/* B2: Penyortir Status */
export const PenyortirStatusSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const cards = [
    { code: '200 OK', bin: '2xx' },
    { code: '404 Not Found', bin: '4xx' },
    { code: '500 Server Error', bin: '5xx' },
    { code: '201 Created', bin: '2xx' },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('Ketuk keranjang yang cocok untuk kode status ini.');

  const current = cards[idx];
  const pickBin = (bin: string) => {
    if (!current) return;
    if (bin === current.bin) {
      setScore((s) => s + 1);
      setMsg(`Tepat! ${current.code} masuk kelompok ${bin}.`);
      setIdx((i) => i + 1);
      onCompleteInteraction?.();
    } else {
      setMsg(`Hampir! ${current.code} dimulai dengan angka ${current.bin[0]}.`);
    }
  };

  return (
    <SimShellB
      title="Penyortir Kode Status HTTP"
      demoHint="Memasukkan 200 ke 2xx, 404 ke 4xx, dan 500 ke 5xx."
      onRunDemo={() => {
        setIdx(cards.length);
        setScore(cards.length);
        setMsg('Semua 4 kartu tersortir tepat!');
        onCompleteInteraction?.();
      }}
      onReset={() => {
        setIdx(0);
        setScore(0);
        setMsg('Ketuk keranjang yang cocok untuk kode status ini.');
      }}
    >
      {current ? (
        <div className="rounded-[var(--radius-md)] bg-[var(--boss)] p-4 text-center text-[var(--on-boss)]">
          <div className="text-xs text-[var(--on-boss)] opacity-80">Kartu {idx + 1} dari {cards.length}</div>
          <div className="pw-code mt-1 text-xl font-bold text-[var(--star)]">{current.code}</div>
        </div>
      ) : (
        <div className="rounded-[var(--radius-md)] bg-[var(--ok-50)] p-4 text-center font-bold text-[var(--ok-600)]">
          Selesai! Skor {score}/{cards.length}
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {[
          ['2xx', '2xx (Berhasil)'],
          ['4xx', '4xx (Salah Minta)'],
          ['5xx', '5xx (Dapur Rusak)'],
        ].map(([b, label]) => (
          <Button key={b} variant="secondary" disabled={!current} onClick={() => pickBin(b)} className="text-xs">
            {label}
          </Button>
        ))}
      </div>
      <p className="text-xs font-semibold text-[var(--ink-2)]">{msg}</p>
    </SimShellB>
  );
};

/* B2: Perakit Request (menggunakan mockFetch lokal) */
export const PerakitRequestSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'DELETE'>('GET');
  const [path, setPath] = useState('/produk');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<MockResponse | null>(null);

  const send = async (m = method, p = path) => {
    setLoading(true);
    const body = m === 'POST' ? { produk_id: 7, jumlah: 1 } : undefined;
    const res = await mockFetch(m, p, body);
    setResp(res);
    setLoading(false);
    onCompleteInteraction?.();
  };

  return (
    <SimShellB
      title="Perakit Request API (api.toko-rani.example)"
      demoHint="Mengirim GET /produk ke API tiruan lokal dan memeriksa status 200 serta JSON."
      onRunDemo={() => {
        setMethod('GET');
        setPath('/produk');
        void send('GET', '/produk');
      }}
      onReset={() => setResp(null)}
    >
      <div className="flex flex-wrap gap-2">
        <select
          aria-label="Pilih method HTTP"
          value={method}
          onChange={(e) => setMethod(e.target.value as 'GET' | 'POST' | 'DELETE')}
          className="pw-code min-h-[48px] rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-bold"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="DELETE">DELETE</option>
        </select>
        <select
          aria-label="Pilih endpoint"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="pw-code min-h-[48px] flex-1 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--paper)] px-3 py-2"
        >
          <option value="/produk">/produk</option>
          <option value="/produk/7">/produk/7</option>
          <option value="/produk/999">/produk/999 (404)</option>
          <option value="/pesanan">/pesanan</option>
          <option value="/pesanan/ORD-101">/pesanan/ORD-101</option>
        </select>
        <Button variant="primary" loading={loading} onClick={() => void send()}>
          Kirim
        </Button>
      </div>
      <div className="sr-only" role="status">
        {loading ? 'Menunggu balasan.' : resp ? `Status balasan ${resp.status} ${resp.statusText}.` : ''}
      </div>
      {resp && (
        <div className="pw-code rounded-[var(--radius-md)] bg-[var(--boss)] p-3 text-xs text-[var(--on-boss)] overflow-x-auto">
          <div className="mb-1 font-bold text-[var(--star)]">
            Status: {resp.status} {resp.statusText} ({resp.durationMs} ms)
          </div>
          <pre className="m-0 whitespace-pre-wrap">{JSON.stringify(resp.body, null, 2)}</pre>
        </div>
      )}
    </SimShellB>
  );
};

/* B3: Dokter JSON */
export const DokterJsonSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [fixedQuotes, setFixedQuotes] = useState(false);
  const [fixedComma, setFixedComma] = useState(false);

  const allValid = fixedQuotes && fixedComma;
  return (
    <SimShellB
      title="Dokter JSON"
      demoHint="Mengetuk baris berkutip satu dan koma terakhir untuk menyembuhkan JSON."
      onRunDemo={() => {
        setFixedQuotes(true);
        setFixedComma(true);
        onCompleteInteraction?.();
      }}
      onReset={() => {
        setFixedQuotes(false);
        setFixedComma(false);
      }}
    >
      <p className="text-xs text-[var(--ink-2)]">Ketuk baris JSON yang sakit untuk memperbaikinya:</p>
      <div className="pw-code space-y-1 rounded-[var(--radius-md)] bg-[var(--boss)] p-3 text-xs text-[var(--on-boss)]">
        <div>{'{'}</div>
        <button
          type="button"
          onClick={() => {
            setFixedQuotes(true);
            onCompleteInteraction?.();
          }}
          className={`block w-full rounded-[var(--radius-xs)] px-2 py-1 text-left cursor-pointer ${
            fixedQuotes ? 'border-2 border-solid border-[var(--ok-500)] bg-[var(--ok-50)] text-[var(--ink)]' : 'border-2 border-dashed border-[var(--warn-500)] bg-[var(--warn-50)] text-[var(--ink)] font-bold'
          }`}
        >
          {fixedQuotes ? '  "nama": "Tas Kanvas",' : "  nama: 'Tas Kanvas',   // ketuk perbaiki kutip!"}
        </button>
        <button
          type="button"
          onClick={() => {
            setFixedComma(true);
            onCompleteInteraction?.();
          }}
          className={`block w-full rounded-[var(--radius-xs)] px-2 py-1 text-left cursor-pointer ${
            fixedComma ? 'border-2 border-solid border-[var(--ok-500)] bg-[var(--ok-50)] text-[var(--ink)]' : 'border-2 border-dashed border-[var(--warn-500)] bg-[var(--warn-50)] text-[var(--ink)] font-bold'
          }`}
        >
          {fixedComma ? '  "harga": 85000' : '  "harga": 85000,       // ketuk hapus koma akhir!'}
        </button>
        <div>{'}'}</div>
      </div>
      {allValid && (
        <p className="text-xs font-extrabold text-[var(--ok-600)]">
          ✓ JSON Sehat! JSON.parse() berhasil membacanya.
        </p>
      )}
    </SimShellB>
  );
};

/* B4: Pelayan GraphQL */
export const PelayanGraphqlSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [fields, setFields] = useState({ nama: true, harga: true, stok: false });
  const toggle = (key: keyof typeof fields) => {
    setFields((f) => ({ ...f, [key]: !f[key] }));
    onCompleteInteraction?.();
  };
  const responseObj: Record<string, unknown> = {};
  if (fields.nama) responseObj.nama = 'Tas Kanvas Bito';
  if (fields.harga) responseObj.harga = 85000;
  if (fields.stok) responseObj.stok = 5;

  return (
    <SimShellB
      title="Pelayan Pribadi GraphQL"
      demoHint="Memilih hanya kolom nama dan harga; jawaban server mengikuti bentuk permintaan persis."
      onRunDemo={() => {
        setFields({ nama: true, harga: true, stok: false });
        onCompleteInteraction?.();
      }}
      onReset={() => setFields({ nama: true, harga: false, stok: false })}
    >
      <div className="flex flex-wrap gap-3">
        {(['nama', 'harga', 'stok'] as const).map((k) => (
          <label key={k} className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--line)] px-3 cursor-pointer">
            <input type="checkbox" checked={fields[k]} onChange={() => toggle(k)} />
            <span className="pw-code text-sm font-bold">{k}</span>
          </label>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2 pw-code text-xs">
        <pre className="rounded-[var(--radius-md)] bg-[var(--boss)] p-3 text-[var(--on-boss)] m-0">
          {`query {\n  produk(id: 2) {\n${Object.entries(fields)
            .filter(([, v]) => v)
            .map(([k]) => `    ${k}`)
            .join('\n')}\n  }\n}`}
        </pre>
        <pre className="rounded-[var(--radius-md)] bg-[var(--cream)] p-3 text-[var(--ink)] border border-[var(--line)] m-0">
          {JSON.stringify({ data: { produk: responseObj } }, null, 2)}
        </pre>
      </div>
    </SimShellB>
  );
};

/* B5: Balap Realtime */
export const BalapRealtimeSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [step, setStep] = useState(0);
  return (
    <SimShellB
      title="Balap Realtime: Polling vs SSE vs WebSocket"
      demoHint="Membandingkan berapa kali bertanya pada Polling dibanding satu koneksi SSE dan WebSocket."
      onRunDemo={() => {
        setStep(3);
        onCompleteInteraction?.();
      }}
      onReset={() => setStep(0)}
    >
      <div className="space-y-2 text-xs">
        <div className="rounded-[var(--radius-sm)] border border-[var(--line)] p-2.5">
          <strong>Polling:</strong>{' '}
          {step === 0 ? 'Diam' : `${step * 3} request dikirim ("Sudah? Belum. Sudah? Belum...")`}
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--ok-500)] bg-[var(--ok-50)] p-2.5">
          <strong>SSE (Radio):</strong>{' '}
          {step === 0 ? 'Diam' : `1 koneksi terbuka, server kirim ${step} kabar seketika!`}
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--world-600)] bg-[var(--world-50)] p-2.5">
          <strong>WebSocket (Telepon):</strong>{' '}
          {step === 0 ? 'Diam' : `1 koneksi dua arah! Server & client sudah bertukar ${step * 2} pesan!`}
        </div>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          setStep((s) => Math.min(4, s + 1));
          onCompleteInteraction?.();
        }}
      >
        Kirim Kabar Baru ({step}/4)
      </Button>
    </SimShellB>
  );
};

/* B6: Bel Webhook */
export const BelWebhookSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [paid, setPaid] = useState(false);
  return (
    <SimShellB
      title="Bel Pintu Webhook"
      demoHint="Pembeli bayar di bank → Payment gateway memencet bel POST ke Server Toko Rani."
      onRunDemo={() => {
        setPaid(true);
        onCompleteInteraction?.();
      }}
      onReset={() => setPaid(false)}
    >
      <div className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--cream)] p-4">
        <div>
          <div className="font-bold">Status Tagihan #88</div>
          <div className="text-xs text-[var(--ink-2)]">
            {paid ? 'Webhook POST /webhook diterima → LUNAS ✓' : 'Menunggu pembeli membayar...'}
          </div>
        </div>
        <Bell className={`h-8 w-8 ${paid ? 'text-[var(--ok-600)]' : 'text-[var(--ink-3)]'}`} aria-hidden="true" />
      </div>
      <Button
        variant="primary"
        onClick={() => {
          setPaid(true);
          onCompleteInteraction?.();
        }}
      >
        Simulasikan Pembeli Membayar → Bunyikan Webhook
      </Button>
    </SimShellB>
  );
};

/* B7: Pembaca Gelang JWT */
export const PembacaGelangJwtSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [tampered, setTampered] = useState(false);
  return (
    <SimShellB
      title="Pembaca Gelang Hologram JWT"
      demoHint="Mengubah isi payload menjadi role: admin menyebabkan hologram Signature tidak cocok lagi."
      onRunDemo={() => {
        setTampered(true);
        onCompleteInteraction?.();
      }}
      onReset={() => setTampered(false)}
    >
      <div className="pw-code break-all rounded-[var(--radius-md)] bg-[var(--surface-well)] p-3 text-xs text-[var(--ink)]">
        <span className="text-[var(--err-600)]">eyJhbGciOiJIUzI1NiJ9</span>.
        <span className="text-[var(--warn-700)]">{tampered ? 'eyJyb2xlIjoiYWRtaW4ifQ' : 'eyJyb2xlIjoicGVtYmVsaSJ9'}</span>.
        <span className="text-[var(--ok-600)]">7mK2xQ9vR_sig</span>
      </div>
      <div className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-3 text-xs space-y-1">
        <div><strong>Payload terbaca:</strong> {tampered ? '{"role":"admin"}' : '{"role":"pembeli"}'}</div>
        <div className={`font-extrabold ${tampered ? 'text-[var(--warn-700)]' : 'text-[var(--ok-600)]'}`}>
          {tampered
            ? '✗ Hologram Signature TIDAK COCOK! Penjaga menolak gelang palsu ini (401).'
            : '✓ Hologram Signature sah dari server.'}
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          setTampered(!tampered);
          onCompleteInteraction?.();
        }}
      >
        {tampered ? 'Kembalikan Gelang Asli' : 'Coba Ubah Payload Jadi Admin'}
      </Button>
    </SimShellB>
  );
};

/* B8: Satpam CORS */
export const SatpamCorsSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [origin, setOrigin] = useState('https://toko-rani.example');
  const allowed = origin === 'https://toko-rani.example';
  return (
    <SimShellB
      title="Pos Satpam Browser (CORS)"
      demoHint="Mengubah origin peminta ke situs-asing.example dan melihat satpam browser menolaknya."
      onRunDemo={() => {
        setOrigin('https://situs-lain.example');
        onCompleteInteraction?.();
      }}
      onReset={() => setOrigin('https://toko-rani.example')}
    >
      <div className="flex flex-wrap gap-2">
        {['https://toko-rani.example', 'https://situs-lain.example'].map((orig) => (
          <button
            key={orig}
            type="button"
            onClick={() => {
              setOrigin(orig);
              onCompleteInteraction?.();
            }}
            className={`pw-code min-h-[44px] rounded-[var(--radius-sm)] border-2 px-3 text-xs font-bold cursor-pointer ${
              origin === orig ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)]'
            }`}
          >
            Origin: {orig}
          </button>
        ))}
      </div>
      <div className={`flex items-center gap-3 rounded-[var(--radius-md)] p-3 text-xs font-bold ${allowed ? 'bg-[var(--ok-50)] text-[var(--ok-600)]' : 'bg-[var(--warn-50)] text-[var(--warn-700)]'}`}>
        {allowed ? <ShieldCheck className="h-6 w-6 flex-shrink-0" /> : <ShieldAlert className="h-6 w-6 flex-shrink-0" />}
        <span>
          {allowed
            ? 'Server mengirim Access-Control-Allow-Origin: https://toko-rani.example → Diizinkan!'
            : 'Tidak ada header izin untuk https://situs-lain.example → Diblokir satpam browser!'}
        </span>
      </div>
    </SimShellB>
  );
};

/* B8: Telepon Sopan (Retry + Backoff) */
export const TeleponSopanSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [strategy, setStrategy] = useState<'spam' | 'backoff'>('backoff');
  return (
    <SimShellB
      title="Menelepon Sopan (Rate Limit & Backoff)"
      demoHint="Membandingkan mengetuk tiap detik (429 terus) vs jeda 1s → 2s → 4s (server pulih)."
      onRunDemo={() => {
        setStrategy('backoff');
        onCompleteInteraction?.();
      }}
      onReset={() => setStrategy('backoff')}
    >
      <div className="flex gap-2">
        <Button variant={strategy === 'spam' ? 'danger' : 'secondary'} onClick={() => { setStrategy('spam'); onCompleteInteraction?.(); }}>
          Tanya Terus Tanpa Jeda
        </Button>
        <Button variant={strategy === 'backoff' ? 'primary' : 'secondary'} onClick={() => { setStrategy('backoff'); onCompleteInteraction?.(); }}>
          Jeda Bertahap (1s → 2s → 4s)
        </Button>
      </div>
      <p className="rounded-[var(--radius-md)] bg-[var(--cream)] p-3 text-xs font-semibold">
        {strategy === 'spam'
          ? 'Server makin kewalahan dan terus menjawab 429 Too Many Requests!'
          : 'Server punya waktu bernapas dan berhasil menjawab 200 OK pada percobaan ketiga!'}
      </p>
    </SimShellB>
  );
};

/* B9: Empat Wajah Layar */
export const EmpatWajahLayarSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [view, setView] = useState<'loading' | 'error' | 'empty' | 'ok'>('ok');
  return (
    <SimShellB
      title="Empat Wajah Layar API"
      demoHint="Beralih melihat keempat keadaan: loading, error, kosong, dan berhasil."
      onRunDemo={() => {
        setView('loading');
        onCompleteInteraction?.();
      }}
      onReset={() => setView('ok')}
    >
      <div className="flex flex-wrap gap-2">
        {([
          ['loading', '1. Memuat'],
          ['error', '2. Gagal'],
          ['empty', '3. Kosong'],
          ['ok', '4. Berhasil'],
        ] as const).map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setView(v);
              onCompleteInteraction?.();
            }}
            className={`min-h-[40px] rounded-[var(--radius-sm)] border px-3 text-xs font-bold cursor-pointer ${
              view === v ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="min-h-[84px] rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-4 flex items-center justify-center text-center text-sm">
        {view === 'loading' && <div role="status" className="pw-well h-8 w-48" aria-label="Skeleton memuat" />}
        {view === 'error' && <span className="font-bold text-[var(--warn-700)]">Koneksi terputus. [Tombol Coba Lagi]</span>}
        {view === 'empty' && <span className="font-semibold text-[var(--ink-2)]">Belum ada pesanan. [Mulai Belanja]</span>}
        {view === 'ok' && <span className="font-bold text-[var(--ok-600)]">✓ 4 Produk Toko Rani tampil rapi!</span>}
      </div>
    </SimShellB>
  );
};

/* B1 & B10: Pemilih API */
export const PuncakApiSim: React.FC<SimComponentProps> = ({ onCompleteInteraction }) => {
  const [need, setNeed] = useState<'crud' | 'chat' | 'stream' | 'pay'>('crud');
  const advice = {
    crud: 'REST API — sederhana, memakai method GET/POST/PATCH/DELETE dan cache HTTP.',
    chat: 'WebSocket — jalur telepon dua arah terbuka terus untuk chat realtime.',
    stream: 'SSE — siaran radio satu arah untuk notifikasi atau streaming teks.',
    pay: 'Webhook — kurir memencet bel server saat pembayaran selesai.',
  };
  return (
    <SimShellB
      title="Pohon Keputusan Jenis API"
      demoHint="Memilih jenis kebutuhan aplikasi dan melihat arsitektur API yang paling cocok."
      onRunDemo={() => {
        setNeed('chat');
        onCompleteInteraction?.();
      }}
      onReset={() => setNeed('crud')}
    >
      <div className="grid grid-cols-2 gap-2">
        {[
          ['crud', 'Katalog Toko Biasa'],
          ['chat', 'Chat 2 Arah'],
          ['stream', 'Live Notifikasi'],
          ['pay', 'Kabar Bayar Lunas'],
        ].map(([k, label]) => (
          <Button
            key={k}
            variant={need === k ? 'primary' : 'secondary'}
            onClick={() => {
              setNeed(k as typeof need);
              onCompleteInteraction?.();
            }}
            className="text-xs"
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="rounded-[var(--radius-md)] bg-[var(--world-50)] p-3 text-sm font-bold text-[var(--world-700)]">
        Rekomendasi: {advice[need]}
      </div>
    </SimShellB>
  );
};
