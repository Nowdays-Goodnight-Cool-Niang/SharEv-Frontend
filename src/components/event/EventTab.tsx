import { PropsWithChildren } from 'react';

interface EventTabProps extends PropsWithChildren {
  isSelected: boolean;
  onClick: () => void;
}

export default function EventTab({ isSelected, onClick, children }: EventTabProps) {
  return (
    <button
      onClick={onClick}
      className={`text-button-4 whitespace-nowrap rounded-[4px] px-3 py-2 transition-colors ${
        isSelected ? 'bg-orange-500 text-gray-50' : 'text-gray-500'
      }`}
    >
      {children}
    </button>
  );
}
