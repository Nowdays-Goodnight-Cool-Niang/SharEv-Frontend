import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

function Modal({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className="animate-modal-enter relative z-10 w-full max-w-72 space-y-6 rounded-xl border border-gray-700 bg-gray-900/90 p-6 shadow-xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
