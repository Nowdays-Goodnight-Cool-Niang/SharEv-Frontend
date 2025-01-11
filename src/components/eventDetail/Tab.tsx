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
        isActive ? "text-blue-500 bg-white" : "text-gray-300"
      }  text-label-3 py-3 w-full `}
    >
      {text}
    </button>
  );
}

export default Tab;
