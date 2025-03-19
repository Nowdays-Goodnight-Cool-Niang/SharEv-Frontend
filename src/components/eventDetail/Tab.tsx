interface TabProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
}

function Tab({ text, onClick, isActive }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg ${
        isActive ? 'bg-white text-blue-500' : 'text-gray-300'
      } text-label-3 w-full py-3`}
    >
      {text}
    </button>
  );
}

export default Tab;
