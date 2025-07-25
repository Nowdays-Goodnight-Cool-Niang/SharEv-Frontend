type TabItem = {
  key: string;
  icon: {
    active: React.ReactNode;
    inactive: React.ReactNode;
  };
  label: string;
  value: string;
};

interface ViewTabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ViewTabs({ tabs, value, onChange, className }: ViewTabsProps) {
  return (
    <div className={`flex w-fit gap-1 rounded-lg bg-gray-100 p-1 ${className ?? ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`z-10 flex h-8 items-center justify-center gap-1.5 px-2 font-medium transition-colors duration-300 ${
            value === tab.value
              ? 'rounded-lg bg-white text-gray-700 shadow-md shadow-gray-500/10'
              : 'text-gray-400'
          }`}
          onClick={() => onChange(tab.value)}
        >
          {value === tab.value ? tab.icon.active : tab.icon.inactive}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
