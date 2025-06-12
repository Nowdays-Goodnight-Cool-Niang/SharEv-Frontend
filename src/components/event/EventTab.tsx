import { PropsWithChildren } from 'react';

interface EventTabProps extends PropsWithChildren {
  isSelected: boolean;
  onClick: () => void;
}

export default function EventTab({ isSelected, onClick, children }: EventTabProps) {
  return (
    <button
      onClick={onClick}
      className={`relaive flex flex-col items-center whitespace-nowrap p-2 transition-colors duration-300 ${
        isSelected ? 'text-orange-500' : 'text-gray-600'
      }`}
    >
      {children}
      {isSelected && <div className="absolute w-1 h-1 bg-orange-500 rounded-full bottom-3"></div>}
    </button>
  );
}
