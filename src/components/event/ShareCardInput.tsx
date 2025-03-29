import { useEffect, useRef, useState } from 'react';
import { useShareCardDetailStore } from '../../stores/useShareCardDetailStore';

interface IShareCardInput {
  field: string;
  placeholder?: string;
  initialValue: string;
}

function ShareCardInput({ field, placeholder = '', initialValue }: IShareCardInput) {
  console.log(initialValue);
  const [content, setContent] = useState(initialValue);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { editMode, shareCardDetail, setShareCardDetailByKey } = useShareCardDetailStore();

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    console.log(e.currentTarget.textContent);
    setContent(e.currentTarget.textContent || '');
    setShareCardDetailByKey(field, e.currentTarget.textContent || '');
    console.log(shareCardDetail);
  };

  useEffect(() => {
    if (spanRef.current && content === '') {
      spanRef.current.dataset.placeholder = placeholder;
    } else if (spanRef.current) {
      delete spanRef.current.dataset.placeholder;
    }
  }, [content, placeholder]);

  return (
    <span
      ref={spanRef}
      contentEditable={editMode}
      onInput={handleInput}
      suppressContentEditableWarning
      className="text-body-3 relative mx-2 rounded-[4px] bg-gray-800 px-2 py-[6px] leading-10 text-gray-200 before:text-gray-600 before:content-[attr(data-placeholder)] focus:outline-none focus:ring-1 focus:ring-gray-600"
    />
  );
}

export default ShareCardInput;
