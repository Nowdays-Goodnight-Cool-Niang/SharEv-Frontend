interface IButtonTertiaryProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonTertiary({ children, onClick }: IButtonTertiaryProps) {
  return (
    <button
      className="text-label rounded-lg bg-blue-100 px-4 py-2 text-blue-500 hover:bg-blue-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonTertiary;
