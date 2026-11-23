interface ToolWorkshopVisualProps {
  alt: string;
}

export function NpmViteWorkshopVisual({ alt }: ToolWorkshopVisualProps) {
  const nodeClass = 'min-w-0 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--paper-raised)] px-2 py-2';

  return (
    <figure
      role="img"
      aria-label={alt}
      data-workshop-visual="npm-vite"
      className="m-0 w-full min-w-0 max-w-[320px] text-center text-[var(--ink)]"
    >
      <div className={`mx-auto w-fit text-sm font-bold ${nodeClass}`}>Berkas proyek</div>
      <div aria-hidden="true" className="mx-auto h-2.5 w-px bg-[var(--line-strong)]" />
      <div aria-hidden="true" className="mx-[25%] h-2.5 border-x border-t border-[var(--line-strong)]" />
      <div className="grid grid-cols-2 items-start gap-2">
        <div className={nodeClass}>
          <code className="pw-code block text-xs">npm run dev</code>
          <span className="mt-1 block text-xs font-bold">Situs saat diedit</span>
        </div>
        <div className="min-w-0">
          <div className={nodeClass}>
            <code className="pw-code block text-xs">npm run build</code>
            <span className="mt-1 block text-xs font-bold">
              Folder <code className="font-mono text-[var(--world-700)]">dist</code>
            </span>
          </div>
          <span aria-hidden="true" className="block text-sm leading-5 text-[var(--ink-2)]">↓</span>
          <div className={nodeClass}>
            <code className="pw-code block text-xs">npm run preview</code>
            <span className="mt-1 block text-xs font-bold">Pratinjau hasil build</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

export function DevToolsWorkshopVisual({ alt }: ToolWorkshopVisualProps) {
  return (
    <div
      data-workshop-visual="devtools-network"
      className="w-full min-w-0 max-w-[320px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--paper-raised)] text-[var(--ink)]"
    >
      <div aria-hidden="true" className="border-b border-[var(--line)] bg-[var(--surface-well)] px-3 py-2 text-sm font-extrabold">
        Network
      </div>
      <table className="w-full table-fixed text-left text-xs">
        <caption className="sr-only">{alt}</caption>
        <thead className="text-[var(--ink-2)]">
          <tr>
            <th scope="col" className="w-[56%] px-3 py-2">Permintaan</th>
            <th scope="col" className="px-2 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[var(--line)] align-top">
            <th scope="row" className="px-3 py-2 font-normal">
              <code className="pw-code wrap-anywhere">GET /produk/7</code>
            </th>
            <td className="px-2 py-2 font-bold text-[var(--ok-600)]">200 OK</td>
          </tr>
          <tr className="border-t border-[var(--line)] bg-[var(--warn-50)] align-top">
            <th scope="row" className="px-3 py-2 font-normal">
              <code className="pw-code wrap-anywhere">GET /produk/999</code>
            </th>
            <td className="px-2 py-2 font-bold text-[var(--warn-700)]">404 Not Found</td>
          </tr>
        </tbody>
      </table>
      <dl className="m-0 grid grid-cols-2 divide-x divide-[var(--line)] border-t border-[var(--line)] text-xs">
        <div className="min-w-0 px-3 py-2">
          <dt className="pw-code font-bold">Headers</dt>
          <dd className="m-0 text-[var(--ink-2)]">Alamat dan status</dd>
        </div>
        <div className="min-w-0 px-3 py-2">
          <dt className="pw-code font-bold">Response</dt>
          <dd className="m-0 text-[var(--ink-2)]">Isi balasan</dd>
        </div>
      </dl>
    </div>
  );
}
