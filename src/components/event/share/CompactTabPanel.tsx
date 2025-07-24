import CompactTabSelector from './CompactTabSelector';

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface CompactTabPanelProps {
  title: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabConfigs: TabItem[];
}

export default function CompactTabPanel({
  title,
  activeTab,
  setActiveTab,
  tabConfigs,
}: CompactTabPanelProps) {
  const selectedTab = tabConfigs.find((tab) => tab.value === activeTab);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-lg font-semibold leading-7 tracking-tight text-gray-700">{title}</h2>
        <CompactTabSelector
          tabConfigs={tabConfigs.map(({ label, value }) => ({ label, value }))}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <div>{selectedTab?.content}</div>
    </div>
  );
}
