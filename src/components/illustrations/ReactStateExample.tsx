interface ReactStateExampleProps {
  variant: 'props' | 'state';
  alt: string;
}

const examples = {
  props: {
    caption: 'App mengirim prop nama ke KartuProduk',
    snapshots: [
      { label: 'Prop awal', value: 'nama="Tas"', output: 'Tas' },
      { label: 'Prop baru', value: 'nama="Buku"', output: 'Buku' },
    ],
  },
  state: {
    caption: 'Klik menjadwalkan penambahan jumlah',
    snapshots: [
      { label: 'Sebelum klik', value: 'jumlah = 0', output: 'Tambah barang (0)' },
      { label: 'Setelah 1 klik', value: 'jumlah = 1', output: 'Tambah barang (1)' },
    ],
  },
};

/** Inputs and rendered outputs for the two React workshop examples. */
export function ReactStateExample({ variant, alt }: ReactStateExampleProps) {
  const { caption, snapshots } = examples[variant];

  return (
    <figure role="img" aria-label={alt} className="m-0 w-full min-w-0 max-w-[25rem] text-[var(--ink)]">
      <figcaption className="pw-small mb-2 font-semibold text-[var(--ink-2)]">{caption}</figcaption>
      <div className="grid grid-cols-2 gap-2">
        {snapshots.map(({ label, value, output }) => (
          <div key={label} className="min-w-0 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--paper-raised)]">
            <div className="space-y-1 px-2.5 py-2 sm:px-3">
              <div className="pw-small font-bold text-[var(--ink-2)]">{label}</div>
              <code className="block font-mono text-sm wrap-anywhere">{value}</code>
            </div>
            <div className="pw-small border-t border-[var(--line)] px-2.5 py-2 font-extrabold sm:px-3">{output}</div>
          </div>
        ))}
      </div>
    </figure>
  );
}
