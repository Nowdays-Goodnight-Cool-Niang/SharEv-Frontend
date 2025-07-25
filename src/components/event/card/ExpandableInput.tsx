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
      className={`relative mx-1 select-text rounded-lg px-2 py-1.5 ${editMode ? 'bg-white text-gray-800' : 'bg-gray-100 text-gray-700'} leading-10 before:text-gray-300 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-300 data-[has-placeholder=false]:before:content-none dark:border-gray-100/10 dark:text-gray-100 dark:before:text-gray-400/40`}
    />
  );
}

export default ExpandableInput;
