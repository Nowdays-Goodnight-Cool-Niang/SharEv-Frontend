interface ISnsIconProps {
  children: React.ReactNode;
  size?: 'small' | 'default';
  hasUrl: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SnsIcon({ children, size = 'default', hasUrl, onClick }: ISnsIconProps) {
  const defaultClasses =
    'flex items-center justify-center rounded-lg bg-gray-50 text-gray-700 border border-gray-200';
  const sizeClasses = {
    default: 'h-9 w-9',
    small: 'h-8 w-8',
  };

  return (
    <button
      className={`${defaultClasses} ${sizeClasses[size]} ${hasUrl ? '' : 'opacity-20'} ${onClick || 'pointer-events-none'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SnsIcon;
