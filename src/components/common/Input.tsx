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
    <label className="mt-6 block">
      <div className="flex items-center">
        <span className="text-label text-gray-500">{labelName}</span>
        {required && <span className="ml-0.5 text-orange-500">*</span>}
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
        className="mt-2 h-11 w-full rounded bg-gray-700 p-3 text-base placeholder:text-gray-500"
      />
    </label>
  );
}

export default Input;
