const SkeletonCard = () => {
  return (
    <div
      className={`relative flex h-[106.25px] w-[170px] flex-col justify-between rounded-t-lg bg-gray-700 p-3`}
    >
      <div className="flex flex-col justify-end flex-1 gap-2 animate-pulse">
        <div className="w-12 h-3 bg-gray-600 rounded-sm" />
        <div className="w-1/2 h-2 bg-gray-600 rounded-sm" />
      </div>
    </div>
  );
};

export default SkeletonCard;
