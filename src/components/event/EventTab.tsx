import { PropsWithChildren } from 'react';

interface EventTabProps extends PropsWithChildren {
  isSelected: boolean;
  onClick: () => void;
}

export default function EventTab({ isSelected, onClick, children }: EventTabProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-xs tracking-tight transition-colors duration-200 ${
        isSelected
          ? 'font-semibold text-gray-800 dark:text-gray-200'
          : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300'
      } `}
    >
      {children}
    </button>
  );
}
