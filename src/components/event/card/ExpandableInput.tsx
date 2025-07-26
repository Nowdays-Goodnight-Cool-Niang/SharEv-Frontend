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
      onClick={editMode ? (e) => e.stopPropagation() : undefined}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      suppressContentEditableWarning
      data-placeholder={placeholder}
      data-has-placeholder={!value}
      className={`relative mx-1 select-text rounded-lg px-2 py-1.5 ${editMode ? 'border border-gray-200 bg-white text-gray-800' : 'bg-gray-100 text-gray-700'} leading-10 transition-all duration-300 before:text-gray-300 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-400 data-[has-placeholder=false]:before:content-none`}
    />
  );
}

export default ExpandableInput;
