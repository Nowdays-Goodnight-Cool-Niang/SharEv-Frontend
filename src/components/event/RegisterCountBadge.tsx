
interface RegisterCountBadgeProps {
  registerCount: number;
  totalCount: number;
}

export default function RegisterCountBadge({ registerCount, totalCount }: RegisterCountBadgeProps) {
  return (
    <div className="rounded bg-gray-300/20 border border-gray-200/20 backdrop-blur-sm px-1 py-0.5 text-xs font-medium">
      <span className="text-white">{registerCount}</span>
      <span className="text-gray-400">/{totalCount}</span>
    </div>
  );
} 