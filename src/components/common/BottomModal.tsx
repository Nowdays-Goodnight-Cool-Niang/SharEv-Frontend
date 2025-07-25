import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import BaseButton from './BaseButton';

interface BottomModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

function BottomModal({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: BottomModalProps) {
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
    <div className="background fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div
        className={`absolute bottom-0 z-10 h-2/3 w-full animate-modal-enter rounded-t-3xl bg-white`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

BottomModal.Header = function Header({ children }: PropsWithChildren) {
  return <div className="wrapper pt-10">{children}</div>;
};

BottomModal.Body = function Body({ children }: PropsWithChildren) {
  return <div className="wrapper h-full overflow-y-auto pb-60 pt-2">{children}</div>;
};

BottomModal.Footer = function Footer({ children }: PropsWithChildren) {
  return (
    <div className="wrapper absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/80 to-white/0 pb-8 pt-4">
      {children}
    </div>
  );
};

BottomModal.Title = function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="mb-2 flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-700">
      {children}
    </h1>
  );
};

BottomModal.Description = function Description({ children }: PropsWithChildren) {
  return <div className="mb-4 leading-7 tracking-tight text-gray-600">{children}</div>;
};

BottomModal.Box = function Box({ children }: PropsWithChildren) {
  return <div className="rounded-xl bg-gray-50 p-6">{children}</div>;
};

interface BottomModalButtonProps extends PropsWithChildren {
  onClick: () => void;
}

BottomModal.Button = function Button({ children, onClick }: BottomModalButtonProps) {
  return <BaseButton onClick={onClick}> {children}</BaseButton>;
};

export default BottomModal;
