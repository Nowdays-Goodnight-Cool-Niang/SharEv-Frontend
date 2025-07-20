import { ITabButtonOption } from '@/types';
import TabButton from './TabButton';

interface TabSelectorProps {
  tabConfigs: ITabButtonOption[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function TabSelector({ tabConfigs, activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <div className="flex rounded-2xl border border-gray-200/10 bg-white/10 p-1 tracking-tight">
      {tabConfigs.map((option) => (
        <TabButton
          key={option.value}
          option={option}
          selected={activeTab === option.value}
          onClick={setActiveTab}
        />
      ))}
    </div>
  );
}

export default TabSelector;
