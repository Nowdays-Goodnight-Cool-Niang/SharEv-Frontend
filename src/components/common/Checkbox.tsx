interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
}

function Checkbox({ id, checked, onChange, children, className = '' }: CheckboxProps) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1.5 h-4 w-4 appearance-none rounded border border-gray-200 bg-white text-orange-500 checked:border-orange-500 checked:bg-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0"
      />
      <div className="text-body-4 md:text-body-3 text-gray-700">{children}</div>
    </label>
  );
}

export default Checkbox;
