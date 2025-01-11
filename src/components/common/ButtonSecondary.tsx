interface IButtonSecondaryProps {
  children: React.ReactNode;
}

function ButtonSecondary({ children }: IButtonSecondaryProps) {
  return (
    <button className='bg-white text-label text-blue-500 w-full py-3 px-4 border border-blue-500 rounded-2xl hover:border-blue-400'>
      {children}
    </button>
  );
}

export default ButtonSecondary;
