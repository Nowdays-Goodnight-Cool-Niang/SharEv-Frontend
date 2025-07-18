import { useEffect, useRef } from 'react';

interface ExpandableInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  editMode?: boolean;
}

function ExpandableInput({
  value,
  onChange,
  placeholder = '',
  editMode = false,
}: ExpandableInputProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current && spanRef.current.textContent !== value) {
      spanRef.current.textContent = value;
    }
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    onChange(e.currentTarget.textContent || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    // 엔터치면 input이 두 줄로 늘어나서 이를 방지
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
      data-placeholder={placeholder}
      data-has-placeholder={!value}
      className="relative mx-1 select-text rounded-lg border border-gray-100/10 bg-white/10 px-2 py-2 leading-10 text-gray-100 before:text-gray-400/40 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-100/40 data-[has-placeholder=false]:before:content-none"
    />
  );
}

export default ExpandableInput;
