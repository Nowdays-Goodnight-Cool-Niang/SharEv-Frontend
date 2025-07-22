interface IBaseButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'kakao';
  size?: 'default' | 'large';
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function BaseButton({
  children,
  variant = 'default',
  size = 'default',
  isDisabled = false,
  onClick,
}: IBaseButtonProps) {
  const bgClasses = {
    default:
      'bg-gradient-to-br from-blue-500 border border-blue-400 to-blue-600 backdrop-blur-sm dark:bg-gray-50 dark:text-gray-900 text-white hover:bg-gray-900 hover:dark:bg-gray-200',
    kakao: 'bg-[#FEE500] text-[#000000]/85 hover:bg-[#eecc0d]',
  };

  const sizeClasses = {
    default: 'h-14',
    large: 'h-16',
  };

  return (
    <button
      className={`${bgClasses[variant]} w-full rounded-2xl font-semibold tracking-tight transition-colors duration-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 ${sizeClasses[size]}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
