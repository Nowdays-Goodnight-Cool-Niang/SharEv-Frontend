interface ISmallButtonProps {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function SmallButton({ children, isDisabled = false, onClick }: ISmallButtonProps) {
  return (
    <button
      className={`duration-400 text-button-4 rounded-lg bg-orange-500 px-4 py-2 text-gray-50 transition-colors hover:bg-orange-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SmallButton;
