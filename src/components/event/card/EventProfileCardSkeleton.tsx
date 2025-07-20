import gradientImage from '@/assets/images/img_gradient.png';

function EventProfileCardSkeleton() {
  const renderSocialSkeletons = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100/5 bg-white/10 text-gray-100/5"
      ></div>
    ));
  };

  return (
    <div className="w-full max-w-[22rem]">
      <div
        className={`relative aspect-[3/4] h-full w-full min-w-60 overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-white/0 via-white/10 to-indigo-900/50 backdrop-blur-2xl transform-style-3d`}
      >
        <div className="absolute top-0 h-full">
          <img src={gradientImage} className="h-full object-cover opacity-5" alt="" />
        </div>
        <div className="absolute bottom-0 flex aspect-square w-full flex-col items-end justify-end">
          <div className="animate-character-enter w-96 translate-x-20 translate-y-full"></div>
        </div>
        <div className="absolute inset-0 w-full pl-8 pr-6 pt-6">
          <div className="flex justify-end">
            <p className="mb-8 h-4 w-16 rounded border border-gray-100/5 bg-white/10"></p>
          </div>
          <h2 className="mb-6 h-8 w-20 rounded-lg border border-gray-100/5 bg-gray-100/10"></h2>
          <p className="mb-3 h-4 w-32 rounded border border-gray-100/5 bg-white/10"></p>
          <ul className="flex flex-wrap gap-1.5">{renderSocialSkeletons()}</ul>
        </div>
      </div>
    </div>
  );
}

export default EventProfileCardSkeleton;
