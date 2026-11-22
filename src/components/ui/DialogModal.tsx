import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

interface DialogModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  variant?: 'dialog' | 'sheet';
  lightDismiss?: boolean;
  children: React.ReactNode;
}

/**
 * Menggunakan elemen native <dialog> + showModal() + closedby="any" (dengan fallback Safari)
 * sesuai panduan modern-web-guidance: dialog & light-dismiss-a-dialog.
 */
export const DialogModal: React.FC<DialogModalProps> = ({
  open,
  onClose,
  title,
  variant = 'dialog',
  lightDismiss = true,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.returnValue = '';
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      onClose();
    };
    dialog.addEventListener('close', handleClose);

    // Fallback untuk browser yang belum mendukung <dialog closedby="any"> (seperti Safari)
    let cleanupLightDismiss: (() => void) | undefined;
    if (lightDismiss && !('closedBy' in HTMLDialogElement.prototype)) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e) && dialog.open) {
          dialog.close();
        }
        pressedOutside = false;
      };
      dialog.addEventListener('pointerdown', onPointerDown);
      dialog.addEventListener('pointerup', onPointerUp);
      cleanupLightDismiss = () => {
        dialog.removeEventListener('pointerdown', onPointerDown);
        dialog.removeEventListener('pointerup', onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
      cleanupLightDismiss?.();
    };
  }, [lightDismiss, onClose]);

  const dialogClass = variant === 'sheet' ? 'pw-sheet' : 'pw-dialog';

  return (
    <dialog
      ref={dialogRef}
      className={dialogClass}
      aria-labelledby={titleId}
      {...({ closedby: lightDismiss ? 'any' : 'closerequest' } as Record<string, string>)}
    >
      {variant === 'sheet' && (
        <div className="mx-auto mt-2.5 h-1.5 w-12 rounded-full bg-[var(--line)]" aria-hidden="true" />
      )}
      <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3.5 sm:px-6">
        <h2 id={titleId} className="pw-h3">
          {title}
        </h2>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Tutup jendela"
          className="pw-pressable flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-2)] hover:bg-[var(--cream)] hover:text-[var(--ink)] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="max-h-[calc(70dvh-76px)] overflow-y-auto px-5 py-5 sm:px-6 pw-safe-bottom">
        {children}
      </div>
    </dialog>
  );
};
