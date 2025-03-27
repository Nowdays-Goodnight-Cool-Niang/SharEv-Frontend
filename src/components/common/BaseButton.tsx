interface IBaseButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'kakao';
  size?: 'default' | 'small';
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
    default: 'bg-orange-500 text-gray-50 hover:bg-orange-700',
    kakao: 'bg-[#FEE500] text-[#000000]/85 hover:bg-[#eecc0d]',
  };

  const sizeClasses = {
    default: 'text-button-1 rounded-lg p-4',
    small: 'text-button-5 rounded px-3 py-2',
  };

  return (
    <button
      className={`${bgClasses[variant]} duration-400 w-full transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 ${sizeClasses[size]}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default BaseButton;
