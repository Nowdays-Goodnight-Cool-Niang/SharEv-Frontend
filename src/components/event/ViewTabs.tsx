
type TabItem = {
  key: string;
  icon: React.ReactNode;
  value: string | number;
};

interface ViewTabsProps {
  tabs: TabItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export default function ViewTabs({ tabs, value, onChange, className }: ViewTabsProps) {
  return (
    <div className={`flex gap-2 ${className ?? ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`z-10 transition-colors duration-100 ${
            value === tab.value ? 'text-orange-500' : 'text-gray-300/70'
          }`}
          onClick={() => onChange(tab.value)}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
}

