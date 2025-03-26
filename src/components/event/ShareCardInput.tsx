import { useRef, useEffect, useState } from 'react';

interface IShareCardInput {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ShareCardInput({ placeholder = '', value, onChange }: IShareCardInput) {
  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [value]);

  return (
    <div className="relative inline-block">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ width: `${inputWidth}px`, transition: 'width 0.2s' }}
        className="text-body-3 rounded-[4px] bg-gray-800 px-2 py-[6px] text-gray-200 placeholder:text-gray-600"
      />
      <span
        ref={spanRef}
        className="text-body-3 invisible absolute left-0 top-0 whitespace-pre px-2 py-[6px]"
      >
        {value || placeholder}
      </span>
    </div>
  );
}

export default ShareCardInput;
