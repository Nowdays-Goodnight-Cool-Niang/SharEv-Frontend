interface ISnsIconProps {
  children: React.ReactNode;
  size?: 'small' | 'default';
  hasUrl: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SnsIcon({ children, size = 'default', hasUrl, onClick }: ISnsIconProps) {
  const defaultClasses = 'flex items-center justify-center rounded-lg ';
  const sizeClasses = {
    default: 'h-9 w-9',
    small: 'h-7 w-7',
  };

  return (
    <button
      className={`${defaultClasses} ${sizeClasses[size]} ${hasUrl ? 'bg-gray-50 text-gray-700' : 'bg-gray-100 text-gray-300'} ${onClick || 'pointer-events-none'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SnsIcon;
