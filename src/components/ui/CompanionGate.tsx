import React, { useMemo, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { DialogModal } from './DialogModal';

interface CompanionGateProps {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
  title?: string;
  description?: string;
}

/**
 * Gerbang Pendamping (§12.3): soal perkalian acak untuk melindungi Mode Pendamping,
 * perpindahan Junior -> Pro, impor progres, dan hapus data.
 */
export const CompanionGate: React.FC<CompanionGateProps> = ({
  open,
  onClose,
  onUnlock,
  title = 'Area pendamping',
  description = 'Jawab hitungan singkat ini. Area ini untuk pendamping atau orang dewasa.',
}) => {
  const challenge = useMemo(() => {
    const a = Math.floor(Math.random() * 5) + 4; // 4..8
    const b = Math.floor(Math.random() * 6) + 4; // 4..9
    return { a, b, answer: a * b };
  }, [open]);

  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numeric = Number(inputVal.trim());
    if (numeric === challenge.answer) {
      setInputVal('');
      setErrorMsg('');
      onUnlock();
    } else {
      setErrorMsg('Belum pas. Coba hitung lagi.');
    }
  };

  return (
    <DialogModal open={open} onClose={onClose} title={title} lightDismiss>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--paper-2)] p-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
          <p className="pw-small text-[var(--ink-2)]">{description}</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="companion-gate-input" className="block font-bold">
            Berapa {challenge.a} × {challenge.b}?
          </label>
          <input
            id="companion-gate-input"
            type="number"
            inputMode="numeric"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Tulis jawabanmu"
            autoComplete="off"
            autoFocus
            required
            aria-invalid={errorMsg ? true : undefined}
            aria-describedby={errorMsg ? 'companion-gate-error' : undefined}
            className="pw-t-colors min-h-[var(--touch-min)] w-full rounded-[var(--radius-md)] border-2 border-[var(--line-strong)] bg-[var(--paper)] px-4 py-3 text-[var(--ink)]"
          />
          {errorMsg && (
            <p id="companion-gate-error" role="alert" className="pw-small font-semibold text-[var(--warn-700)]">
              {errorMsg}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Batal
          </Button>
          <Button type="submit" variant="primary" className="flex-1">
            Lanjutkan
          </Button>
        </div>
      </form>
    </DialogModal>
  );
};
