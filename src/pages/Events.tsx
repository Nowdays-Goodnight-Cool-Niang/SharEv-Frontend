import BottomSpace from '@/components/common/BottomSpace';
import Header from '@/components/common/Header';
import EventCard from '@/components/events/EventCard';
import EventCardSkeleton from '@/components/events/EventCardSkeleton';
import { events } from '@/constants/event';
import { EVENT_ID } from '@/constants/eventId';
import { useQueryCheckParticipation } from '@/hooks/useQueryCheckParticipation';

function Events() {
  const { data, isLoading } = useQueryCheckParticipation(EVENT_ID);

  if (!isLoading && !data) throw new Error();

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="SharE:v" />
      <div className="wrapper my-2 flex h-12 items-center gap-1.5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">이벤트</h3>
        {!isLoading ? (
          <span className="inline-block font-semibold text-blue-500 dark:text-blue-400">
            {events.length}
          </span>
        ) : (
          <span className="inline-block h-5 w-8 animate-pulse rounded-full bg-gray-200"></span>
        )}
      </div>
      <div className="wrapper space-y-5">
        {!isLoading
          ? events.map((event) => (
              <EventCard key={event.id} event={event} isParticipating={data.isParticipant} />
            ))
          : Array.from({ length: 3 }).map((_, idx) => <EventCardSkeleton key={idx} />)}
      </div>
      <BottomSpace />
    </div>
  );
}

export default Events;
