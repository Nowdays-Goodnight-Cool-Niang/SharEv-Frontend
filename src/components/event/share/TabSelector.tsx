import { ITabButtonOption } from '@/types';
import TabButton from './TabButton';

interface TabSelectorProps {
  tabConfigs: ITabButtonOption[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function TabSelector({ tabConfigs, activeTab, setActiveTab }: TabSelectorProps) {
  return (
    <div className="flex rounded-full bg-gray-100 p-1 tracking-tight">
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
