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
    default: 'bg-gray-800 text-white hover:bg-gray-900',
    kakao: 'bg-[#FEE500] text-[#000000]/85 hover:bg-[#eecc0d]',
  };

  const sizeClasses = {
    default: 'h-14',
    large: 'h-16',
  };

  return (
    <button
      className={`${bgClasses[variant]} duration-400 w-full rounded-xl font-semibold tracking-tight transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 ${sizeClasses[size]}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
