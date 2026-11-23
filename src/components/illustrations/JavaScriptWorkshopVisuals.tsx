import { useState } from 'react';

const orders = [
  { nama: 'Ayu', siap: false },
  { nama: 'Bayu', siap: true },
];
const ready = orders.filter(order => order.siap);
const stages = ['Daftar awal', 'filter', 'map'] as const;
const inputs = ['[', '{}', '[]'] as const;

const inputNames = {
  '[': 'Kurung siku buka, teks terpotong',
  '{}': 'Kurung kurawal, objek kosong',
  '[]': 'Kurung siku, daftar kosong',
};

function Choices<T extends string>({ options, value, label, names, onChange }: {
  options: readonly T[];
  value: T;
  label: string;
  names?: Record<T, string>;
  onChange: (next: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(option => (
        <button key={option} type="button" aria-label={names?.[option]} aria-pressed={value === option}
          className="min-h-11 min-w-11 rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--paper-raised)] px-3 font-mono text-sm font-bold text-[var(--ink)] aria-pressed:border-[var(--ink)] aria-pressed:bg-[var(--ink)] aria-pressed:text-[var(--paper)]"
          onClick={() => onChange(option)}>{option}</button>
      ))}
    </div>
  );
}

export function OrderPipeline() {
  const [stage, setStage] = useState<(typeof stages)[number]>('Daftar awal');
  const visibleOrders = stage === 'Daftar awal' ? orders : ready;
  return (
    <figure className="m-0 w-full max-w-md space-y-3">
      <figcaption className="font-bold">Telusuri daftar pesanan</figcaption>
      <Choices options={stages} value={stage} label="Langkah pengolahan pesanan" onChange={setStage} />
      <div aria-live="polite" aria-atomic="true" className="rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--paper-raised)] p-3 text-[var(--ink)]">
        {stage === 'map' ? (
          <><p className="pw-small">Nama untuk label pengiriman</p><code>{JSON.stringify(ready.map(order => order.nama))}</code></>
        ) : (
          <table className="w-full text-left text-sm">
            <caption className="pb-2 text-left font-bold">{stage === 'filter' ? 'Lolos syarat siap' : 'Semua pesanan'}</caption>
            <thead><tr><th scope="col">nama</th><th scope="col">siap</th></tr></thead>
            <tbody>{visibleOrders.map(order => (
              <tr key={order.nama} className="border-t border-[var(--line)]"><td className="py-1">{order.nama}</td><td><code>{String(order.siap)}</code></td></tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </figure>
  );
}

function traceInput(input: string) {
  try {
    const value: unknown = JSON.parse(input);
    return Array.isArray(value)
      ? { path: 'try → panjang daftar', result: String(value.length) }
      : { path: 'try → periksa bentuk', result: '"Perlu daftar"' };
  } catch {
    return { path: 'try → catch', result: '"Periksa berkas"' };
  }
}

export function JsonBranches() {
  const [input, setInput] = useState<(typeof inputs)[number]>('[');
  const { path, result } = traceInput(input);
  return (
    <figure className="m-0 w-full max-w-md space-y-3">
      <figcaption className="font-bold">Pilih teks yang dibaca fungsi</figcaption>
      <Choices options={inputs} value={input} label="Contoh masukan JSON" names={inputNames} onChange={setInput} />
      <div aria-live="polite" aria-atomic="true" className="space-y-2 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--paper-raised)] p-3 text-sm text-[var(--ink)]">
        <p className="font-bold">{path}</p>
        <p><code>finally</code> mencetak “Pemeriksaan selesai”.</p>
        <p className="border-t border-[var(--line)] pt-2">Nilai kembali <code className="font-bold">{result}</code></p>
      </div>
    </figure>
  );
}
