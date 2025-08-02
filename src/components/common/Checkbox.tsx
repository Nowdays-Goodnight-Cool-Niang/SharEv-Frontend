interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
}

function Checkbox({ id, checked, onChange, children, className = '' }: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer items-start gap-2 ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1.5 h-4 w-4 appearance-none rounded border border-gray-200 bg-white text-blue-500 checked:border-blue-500 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
      />
      <div className="text-sm font-medium tracking-tight text-gray-700">{children}</div>
    </label>
  );
}

export default Checkbox;
