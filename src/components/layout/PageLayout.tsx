interface PageLayoutProps {
  title: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageLayout({ title, rightSlot, children }: PageLayoutProps) {
  return (
    <div className="wrapper">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {rightSlot}
      </div>
      <div>{children}</div>
    </div>
  );
}
