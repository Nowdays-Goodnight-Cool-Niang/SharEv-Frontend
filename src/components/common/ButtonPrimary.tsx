interface IButtonPrimaryProps {
  children: React.ReactNode;
  color?: string;
}
function ButtonPrimary({ children, color = 'bg-black' }: IButtonPrimaryProps) {
  return (
    <button className={`${color} w-full text-subtitle text-base text-white  py-4 rounded-2xl hover:bg-gray-500`}>
      {children}
    </button>
  );
}

export default ButtonPrimary;
