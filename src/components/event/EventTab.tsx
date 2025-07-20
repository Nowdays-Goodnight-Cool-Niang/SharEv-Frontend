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
          ? 'text-xs font-semibold tracking-tight text-white/90 dark:text-gray-200'
          : 'text-xs tracking-tight text-white/30 dark:text-gray-500'
      }`}
    >
      {children}
    </button>
  );
}
