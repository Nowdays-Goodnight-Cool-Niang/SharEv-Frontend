import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';
import EventCard from '@/components/events/EventCard';
import EventCardSkeleton from '@/components/events/EventCardSkeleton';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { IGathering } from '@/types/domain/event';
import { getEventStatus } from '@/utils/eventStatus';
import useScrollToTop from '@/hooks/useScrollToTop';

type FilterTab = 'all' | 'ongoing' | 'ended';

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'ongoing', label: '진행 중' },
  { key: 'ended', label: '종료' },
];

function ParticipatedEvents() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const { data: myGatherings, isLoading } = useQuery<IGathering[]>({
    queryKey: ['gatherings', 'me'],
    queryFn: gatheringAPI.getMyGatherings,
  });

  const sortedGatherings = useMemo(() => {
    if (!myGatherings) return [];

    const statusOrder = { ongoing: 0, upcoming: 1, ended: 2 };
    return [...myGatherings].sort((a, b) => {
      const statusA = getEventStatus(new Date(a.startAt), new Date(a.endAt));
      const statusB = getEventStatus(new Date(b.startAt), new Date(b.endAt));
      if (statusOrder[statusA] !== statusOrder[statusB]) {
        return statusOrder[statusA] - statusOrder[statusB];
      }
      return new Date(b.startAt).getTime() - new Date(a.startAt).getTime();
    });
  }, [myGatherings]);

  const filteredGatherings = useMemo(() => {
    if (activeTab === 'all') return sortedGatherings;
    return sortedGatherings.filter((g) => {
      const status = getEventStatus(new Date(g.startAt), new Date(g.endAt));
      if (activeTab === 'ongoing') return status === 'ongoing' || status === 'upcoming';
      return status === 'ended';
    });
  }, [sortedGatherings, activeTab]);

  const counts = useMemo(() => {
    if (!sortedGatherings.length) return { all: 0, ongoing: 0, ended: 0 };
    let ongoing = 0;
    let ended = 0;
    for (const g of sortedGatherings) {
      const status = getEventStatus(new Date(g.startAt), new Date(g.endAt));
      if (status === 'ended') ended++;
      else ongoing++;
    }
    return { all: sortedGatherings.length, ongoing, ended };
  }, [sortedGatherings]);

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="참여 행사" showBackButton />

      <div className="wrapper flex border-b border-gray-200 dark:border-gray-800">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-gray-900 text-gray-900 dark:border-white dark:text-white'
                : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {tab.label}
            {!isLoading && (
              <span
                className={`text-xs ${activeTab === tab.key ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'}`}
              >
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="wrapper space-y-5 py-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => <EventCardSkeleton key={idx} />)
        ) : filteredGatherings.length > 0 ? (
          filteredGatherings.map((gathering) => {
            const ended =
              getEventStatus(new Date(gathering.startAt), new Date(gathering.endAt)) === 'ended';
            return (
              <EventCard
                key={gathering.id}
                gathering={gathering}
                isParticipating={true}
                hideButton={ended}
              />
            );
          })
        ) : myGatherings && myGatherings.length > 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-sm">해당하는 행사가 없습니다</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-16">
            <p className="text-sm text-gray-400 dark:text-gray-500">아직 참여한 행사가 없어요</p>
            <button
              onClick={() => navigate('/events')}
              className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400"
            >
              이벤트 둘러보기
            </button>
          </div>
        )}
      </div>
      <BottomSpace />
    </div>
  );
}

export default ParticipatedEvents;
