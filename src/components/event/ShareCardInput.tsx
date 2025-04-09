import { useEffect, useRef, useState } from 'react';
import { useShareCardDetailStore } from '../../stores/useShareCardDetailStore';

interface IShareCardInput {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function ShareCardInput({ value, onChange, placeholder = '' }: IShareCardInput) {
  const [isComposing, setIsComposing] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { editMode } = useShareCardDetailStore();

  useEffect(() => {
    if (spanRef.current && spanRef.current.textContent !== value) {
      spanRef.current.textContent = value;
    }
  }, [value]);

  useEffect(() => {
    if (spanRef.current) {
      if (!value) {
        spanRef.current.dataset.placeholder = placeholder;
      } else {
        delete spanRef.current.dataset.placeholder;
      }
    }
  }, [value, placeholder]);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    if (!isComposing) {
      onChange(e.currentTarget.textContent || '');
    }
  };

  return (
    <span
      ref={spanRef}
      contentEditable={editMode}
      onClick={(e) => e.stopPropagation()}
      onInput={handleInput}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={(e) => {
        setIsComposing(false);
        onChange(e.currentTarget.textContent || '');
      }}
      suppressContentEditableWarning
      className="text-body-3 relative mx-2 rounded-[4px] bg-gray-800 px-2 py-[6px] leading-10 text-gray-200 before:text-gray-600 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-700"
    />
  );
}

export default ShareCardInput;
