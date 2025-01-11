interface IButtonSecondaryProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ButtonSecondary({ children, onClick }: IButtonSecondaryProps) {
  return (
    <button
      className='bg-white text-label text-blue-500 w-full py-3 px-4 border border-blue-500 rounded-lg hover:border-blue-400 mt-2'
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonSecondary;
