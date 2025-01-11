import { useState } from 'react';

interface InputProps {
  type?: 'password' | 'text';
  initialValue?: string;
  placeholder?: string;
  labelName?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  labelName,
  type = 'text',
  initialValue = '',
  placeholder = '',
  required = false,
  name,
  maxLength,
  minLength,
  onChange,
}: InputProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <label className='block mt-6'>
      <div className='flex items-center'>
        <span className='text-label text-gray-200'>{labelName}</span>
        {required && <span className='text-pink ml-0.5'>*</span>}
      </div>

      <input
        type={type}
        value={value}
        {...(name && { name })}
        {...(maxLength && { maxLength })}
        {...(minLength && { minLength })}
        required={required}
        onChange={(e) => {
          if (onChange) onChange(e);
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        className='w-full rounded-lg border bg-gray-50 border-gray-70 p-3 text-base placeholder:text-gray-100 mt-2 h-11'
      />
    </label>
  );
}

export default Input;
