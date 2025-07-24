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
      className="relative mx-1 select-text rounded-lg bg-gray-800 px-2.5 py-2 leading-10 text-white before:text-gray-600 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-600 data-[has-placeholder=false]:before:content-none dark:border-gray-100/10 dark:text-gray-100 dark:before:text-gray-400/40"
    />
  );
}

export default ExpandableInput;
