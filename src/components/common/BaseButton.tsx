interface IButtonPrimaryProps {
  children: React.ReactNode;
  variant?: 'default' | 'kakao';
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function ButtonPrimary({
  children,
  variant = 'default',
  isDisabled = false,
  onClick,
}: IButtonPrimaryProps) {
  const bgClasses = {
    default: 'bg-orange-500 text-gray-50 hover:bg-orange-700',
    kakao: 'bg-[#FEE500] text-[#000000]/85 hover:bg-[#eecc0d]',
  };

  return (
    <button
      className={`${bgClasses[variant]} text-button-1 duration-400 w-full rounded-lg p-4 transition-colors disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
