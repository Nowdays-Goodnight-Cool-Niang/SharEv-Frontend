import { useState } from 'react';

interface InputProps {
  type?: 'password' | 'text';
  initialValue?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
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
      className='w-full rounded-lg border border-gray-100 px-4 py-3 text-base placeholder:text-gray-100'
    />
  );
}

export default Input;
