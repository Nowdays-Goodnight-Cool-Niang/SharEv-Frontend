import { ITabButtonOption } from '@/types';

interface CompactTabButtonProps {
  option: ITabButtonOption;
  selected: boolean;
  onClick: (value: string) => void;
}

export default function CompactTabButton({ option, selected, onClick }: CompactTabButtonProps) {
  return (
    <button
      onClick={() => onClick(option.value)}
      className={`z-10 flex h-8 items-center justify-center gap-1.5 px-2 font-medium transition-colors duration-300 ${
        selected
          ? 'rounded-lg bg-white text-gray-700 shadow-md shadow-gray-500/10'
          : 'text-gray-400'
      }`}
    >
      {option.label}
    </button>
  );
}
