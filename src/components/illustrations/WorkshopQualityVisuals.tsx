interface WorkshopVisualProps {
  alt: string;
  props?: Record<string, unknown>;
}

export function DeploymentFlowVisual({ alt, props = {} }: WorkshopVisualProps) {
  const { buildCommand, outputFolder, previewCommand, publicUrl } = props;
  if (
    typeof buildCommand !== 'string' ||
    typeof outputFolder !== 'string' ||
    typeof previewCommand !== 'string' ||
    typeof publicUrl !== 'string'
  ) return null;

  const nodeClass = 'rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--paper)] px-2 py-2.5';

  return (
    <div role="img" aria-label={alt} className="w-full max-w-[360px] text-center text-sm text-[var(--ink)]">
      <div className={`mx-auto w-fit min-w-36 font-bold ${nodeClass}`}>Berkas proyek</div>
      <div className="my-1 flex flex-col items-center text-xs font-semibold text-[var(--ink-2)]">
        <code className="pw-code">{buildCommand}</code>
        <span aria-hidden="true" className="text-base leading-none">↓</span>
      </div>
      <div className={`mx-auto w-fit min-w-36 ${nodeClass}`}>
        <span className="block font-bold">Hasil build</span>
        <code className="pw-code text-[var(--world-700)]">{outputFolder}</code>
      </div>
      <div aria-hidden="true" className="mx-auto h-3 w-px bg-[var(--line-strong)]" />
      <div aria-hidden="true" className="mx-[25%] h-3 border-x border-t border-[var(--line-strong)]" />
      <div className="grid grid-cols-2 gap-2">
        <div className={nodeClass}>
          <span className="block font-bold">Preview lokal</span>
          <code className="pw-code block break-words text-xs text-[var(--ink-2)]">{previewCommand}</code>
        </div>
        <div className={nodeClass}>
          <span className="block font-bold">Alamat publik</span>
          <span className="block text-xs text-[var(--ink-2)]">Unggah isi folder ke hosting</span>
          <code className="pw-code block [overflow-wrap:anywhere] text-xs text-[var(--world-700)]">{publicUrl}</code>
        </div>
      </div>
    </div>
  );
}

interface BoundaryCase {
  total: number;
  expected: number;
  actual: number;
}

function isBoundaryCase(value: unknown): value is BoundaryCase {
  return (
    typeof value === 'object' && value !== null &&
    'total' in value && typeof value.total === 'number' &&
    'expected' in value && typeof value.expected === 'number' &&
    'actual' in value && typeof value.actual === 'number'
  );
}

const rupiah = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 });

export function BoundaryTestVisual({ alt, props = {} }: WorkshopVisualProps) {
  const { cases } = props;
  if (!Array.isArray(cases) || cases.length === 0 || !cases.every(isBoundaryCase)) return null;

  return (
    <div className="w-full max-w-[380px] rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
      <table className="w-full table-fixed text-left text-sm">
        <caption className="sr-only">{alt}</caption>
        <thead className="text-xs text-[var(--ink-2)]">
          <tr>
            <th scope="col" className="p-2.5">Total belanja</th>
            <th scope="col" className="p-2.5">Janji toko</th>
            <th scope="col" className="p-2.5">Kode awal</th>
          </tr>
        </thead>
        <tbody className="tabular-nums">
          {cases.map(({ total, expected, actual }) => (
            <tr key={total} className="border-t border-[var(--line)] align-top">
              <th scope="row" className="p-2.5 font-bold">Rp{rupiah.format(total)}</th>
              <td className="p-2.5">Rp{rupiah.format(expected)}</td>
              <td className="p-2.5">
                Rp{rupiah.format(actual)}
                {actual !== expected && (
                  <span className="block text-xs font-bold text-[var(--warn-700)]">Berbeda</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
