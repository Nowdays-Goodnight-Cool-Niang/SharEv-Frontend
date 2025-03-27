import { useState, useRef, useEffect } from 'react';

export default function CustomInput() {
  const [value, setValue] = useState('');
  const divRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setValue(e.currentTarget.innerText);
  };

  useEffect(() => {
    if (divRef.current && value === '') {
      divRef.current.innerText = '';
    }
  }, [value]);

  return (
    <>
      <div
        ref={divRef}
        contentEditable
        onInput={handleInput}
        className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        data-placeholder="Type something..."
        suppressContentEditableWarning
      />
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #a0aec0; /* Tailwind gray-400 */
        }
        [contenteditable][data-placeholder]:empty:focus:before {
          content: '';
        }
      `}</style>
    </>
  );
}
