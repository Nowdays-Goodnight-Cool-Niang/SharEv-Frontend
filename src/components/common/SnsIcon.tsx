interface ISnsIconProps {
  children: React.ReactNode;
  size?: 'small' | 'default';
  hasUrl: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SnsIcon({ children, size = 'default', hasUrl, onClick }: ISnsIconProps) {
  const defaultClasses = 'flex items-center justify-center rounded bg-gray-700';
  const sizeClasses = {
    default: 'h-9 w-9',
    small: 'h-4 w-4',
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
