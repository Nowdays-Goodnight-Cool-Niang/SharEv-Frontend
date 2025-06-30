import { useEffect, useRef, useState } from 'react';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';

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
      if (!value && !isComposing) {
        spanRef.current.dataset.placeholder = placeholder;
      } else {
        delete spanRef.current.dataset.placeholder;
      }
    }
  }, [value, placeholder, isComposing]);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    if (!isComposing) onChange(e.currentTarget.textContent || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <span
      ref={spanRef}
      contentEditable={editMode}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={(e) => {
        setIsComposing(false);
        onChange(e.currentTarget.textContent || '');
      }}
      suppressContentEditableWarning
      className="font-gmarket text-body-3 relative mx-1 select-text rounded border border-gray-200 bg-white px-2 py-1.5 leading-10 text-gray-900 before:text-gray-400 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-200"
    />
  );
}

export default ShareCardInput;
