import { PropsWithChildren } from 'react';

interface EventTabProps extends PropsWithChildren {
  isSelected: boolean;
  onClick: () => void;
}

export default function EventTab({ isSelected, onClick, children }: EventTabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center justify-center whitespace-nowrap text-xs transition-colors duration-300 ${
        isSelected
          ? 'text-xs font-semibold tracking-tight text-gray-700'
          : 'text-xs tracking-tight text-gray-400'
      }`}
    >
      {children}
    </button>
  );
}
