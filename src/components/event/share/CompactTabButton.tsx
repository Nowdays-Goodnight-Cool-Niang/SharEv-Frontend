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
      className={`rounded-lg px-3 py-2 text-sm font-medium tracking-tight transition-all duration-200 ${
        selected ? 'bg-white text-gray-600' : 'text-gray-500'
      }`}
    >
      {option.label}
    </button>
  );
}
