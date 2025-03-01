interface IButtonPrimaryProps {
  children: React.ReactNode;
  variant?: 'default' | 'kakao' | 'success';
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
    default: 'bg-black hover:bg-gray-500 text-white',
    kakao: 'bg-[#FFE70D] hover:bg-[#E6C90C] text-black',
    success: 'bg-blue-500 hover:bg-blue-300 text-white',
  };

  return (
    <button
      className={`${bgClasses[variant]} w-full rounded-2xl py-4 text-base font-bold`}
      disabled={isDisabled}
      onClick={isDisabled ? () => {} : onClick}
    >
      {children}
    </button>
  );
}

export default ButtonPrimary;
