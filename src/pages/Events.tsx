import BottomSpace from '@/components/common/BottomSpace';
import Header from '@/components/common/Header';
import EventCard from '@/components/events/EventCard';
import EventCardSkeleton from '@/components/events/EventCardSkeleton';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { useQuery } from '@tanstack/react-query';
import { IGathering } from '@/types/domain/event';
import useScrollToTop from '@/hooks/useScrollToTop';

function Events() {
  useScrollToTop();

  const { data: gatherings, isLoading: isGatheringsLoading } = useQuery<IGathering[]>({
    queryKey: ['gatherings'],
    queryFn: gatheringAPI.getGatherings,
  });

  const { data: myGatherings, isLoading: isMyLoading } = useQuery<IGathering[]>({
    queryKey: ['gatherings', 'me'],
    queryFn: gatheringAPI.getMyGatherings,
  });

  const isLoading = isGatheringsLoading || isMyLoading;
  const participatedIds = new Set(myGatherings?.map((g) => g.id) ?? []);

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="SharE:v" />
      <div className="wrapper my-2 flex h-12 items-center gap-1.5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">이벤트</h3>
        {!isLoading ? (
          <span className="inline-block font-semibold text-blue-500 dark:text-blue-400">
            {gatherings?.length ?? 0}
          </span>
        ) : (
          <span className="inline-block h-5 w-8 animate-pulse rounded-full bg-gray-200"></span>
        )}
      </div>
      <div className="wrapper space-y-5">
        {!isLoading && gatherings
          ? gatherings.map((gathering) => (
              <EventCard
                key={gathering.id}
                gathering={gathering}
                isParticipating={participatedIds.has(gathering.id)}
              />
            ))
          : Array.from({ length: 3 }).map((_, idx) => <EventCardSkeleton key={idx} />)}
      </div>
      <BottomSpace />
    </div>
  );
}

export default Events;
