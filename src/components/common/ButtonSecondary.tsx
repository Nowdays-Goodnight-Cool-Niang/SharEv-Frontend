// @ts-nocheck
interface IButtonSecondaryProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonSecondary({ children, onClick }: IButtonSecondaryProps) {
  return (
    <button
      className="text-label mt-2 w-full rounded-lg border border-blue-500 bg-white px-4 py-3 text-blue-500 hover:border-blue-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;
