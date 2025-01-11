interface IButtonTertiaryProps {
  children: React.ReactNode;
  onClick: () => void;
}

function ButtonTertiary({ children, onClick }: IButtonTertiaryProps) {
  return (
    <button className='text-label text-blue-500 bg-blue-100 py-2 px-4 rounded-lg' onClick={onClick}>
      {children}
    </button>
  );
}

export default ButtonTertiary;
