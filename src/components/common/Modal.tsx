import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal ({ isOpen, onClose, children }:ModalProps) {
  if (!isOpen) return null;

  return createPortal(<div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    <div className="bg-white p-6 rounded-lg z-10">
      {children}
    </div>
  </div>
    , document.body
  );
};

export default Modal;