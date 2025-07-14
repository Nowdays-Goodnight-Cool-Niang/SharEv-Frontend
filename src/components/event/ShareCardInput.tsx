import { useEffect, useRef, useState } from 'react';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';

interface IShareCardInput {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

function ShareCardInput({ value, onChange, placeholder = '' }: IShareCardInput) {
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
    onChange(e.currentTarget.textContent || '');
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
      suppressContentEditableWarning
      className="relative mx-1 select-text rounded-lg border border-gray-100/10 bg-white/10 px-2 py-2 leading-10 text-gray-900 before:text-gray-400/40 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-200"
    />
  );
}

export default ShareCardInput;
