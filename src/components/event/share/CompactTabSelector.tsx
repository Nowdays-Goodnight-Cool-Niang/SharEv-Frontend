import { ITabButtonOption } from '@/types';
import CompactTabButton from './CompactTabButton';

interface CompactTabSelectorProps {
  tabConfigs: ITabButtonOption[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CompactTabSelector({
  tabConfigs,
  activeTab,
  setActiveTab,
}: CompactTabSelectorProps) {
  return (
    <div className="flex rounded-lg bg-gray-100 p-1">
      {tabConfigs.map((option) => (
        <CompactTabButton
          key={option.value}
          option={option}
          selected={activeTab === option.value}
          onClick={setActiveTab}
        />
      ))}
    </div>
  );
}
