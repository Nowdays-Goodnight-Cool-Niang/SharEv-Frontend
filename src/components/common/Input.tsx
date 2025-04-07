import { useState, useEffect } from 'react';

interface InputProps {
  type?: 'password' | 'text';
  initialValue?: string;
  placeholder?: string;
  labelName?: string;
  name?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  validationMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  validationMessage,
  onChange,
  onBlur,
}: InputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <label className="mt-6 block">
      <div className="flex items-center">
        <span className="text-label-1 text-gray-500">{labelName}</span>
        {required && <div className="ml-0.5 h-1 w-1 rounded-full bg-orange-500"></div>}
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
        onBlur={onBlur}
        placeholder={placeholder}
        className="text-body-2 mt-2 h-11 w-full rounded bg-gray-700 p-3 text-gray-100 placeholder:text-gray-500"
      />
      {validationMessage && (
        <span className="text-label-2 mt-2 text-orange-500">{validationMessage}</span>
      )}
    </label>
  );
}

export default Input;
