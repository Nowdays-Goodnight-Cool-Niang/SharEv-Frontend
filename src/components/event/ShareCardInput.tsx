import { useState } from 'react';

interface IShareCardInput {
  placeholder?: string;
  value: string;
}

function ShareCardInput({ placeholder = '', value }: IShareCardInput) {
  console.log(value);
  const [content, setContent] = useState(value);

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    setContent(e.currentTarget.textContent || '');
  };

  return (
    <span
      contentEditable
      onInput={handleInput}
      suppressContentEditableWarning
      className="text-body-3 relative mx-2 rounded-[4px] bg-gray-800 px-2 py-[6px] leading-10 text-gray-200 focus:outline-none focus:ring-0"
    >
      <span>{content}</span>
      {content === '' && <span className="text-gray-600">{placeholder}</span>}
    </span>
  );
}

export default ShareCardInput;
