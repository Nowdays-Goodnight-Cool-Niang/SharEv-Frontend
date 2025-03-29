interface ISnsIconProps {
  children: React.ReactNode;
  extraClasses?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SnsIcon({ children, extraClasses, onClick }: ISnsIconProps) {
  const defaultClasses = 'flex items-center justify-center rounded bg-gray-700';

  return (
    <button className={`${defaultClasses} ${extraClasses}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default SnsIcon;
