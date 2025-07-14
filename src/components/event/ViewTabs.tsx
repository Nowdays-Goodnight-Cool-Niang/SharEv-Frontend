type TabItem = {
  key: string;
  icon: React.ReactNode;
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
    <div
      className={`flex w-fit gap-2 rounded-lg border border-gray-100/10 bg-gray-100/10 p-1 backdrop-blur-sm ${className ?? ''}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`z-10 flex h-8 w-8 flex-col items-center justify-center transition-colors duration-100 ${
            value === tab.value
              ? 'rounded-lg bg-white text-gray-700 shadow-md shadow-gray-500/10'
              : 'text-white/50'
          }`}
          onClick={() => onChange(tab.value)}
        >
          {tab.icon}
        </button>
      ))}
    </div>
  );
}
