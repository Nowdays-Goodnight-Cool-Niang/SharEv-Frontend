interface InputProps {
  type?: 'password' | 'text';
  value?: string;
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
  value = '',
  placeholder = '',
  required = false,
  name,
  maxLength,
  minLength,
  validationMessage,
  onChange,
  onBlur,
}: InputProps) {
  return (
    <label className="mt-6 block">
      <div className="flex items-center">
        <span className="text-sm font-medium leading-6 tracking-tight text-gray-700">
          {labelName}
        </span>
        {required && (
          <div className="ml-1 rounded-md bg-orange-100 px-1.5 py-0.5 text-xs font-semibold text-orange-500">
            필수
          </div>
        )}
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
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        className="text-body-3 mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-700 placeholder:text-gray-300 dark:bg-gray-700 dark:text-gray-100"
      />
      {validationMessage && (
        <span className="mt-2 inline-block px-4 text-sm font-medium leading-7 tracking-tight text-orange-500">
          {validationMessage}
        </span>
      )}
    </label>
  );
}

export default Input;
