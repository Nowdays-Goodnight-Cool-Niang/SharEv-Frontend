import Header from '@/components/common/Header';
import EventCard from '@/components/events/EventCard';
import { EVENT_ID } from '@/constants/eventId';
import { useQueryCheckParticipation } from '@/hooks/useQueryCheckParticipation';
import { IEvent } from '@/types/domain/event';

export const events: IEvent[] = [
  {
    id: 1,
    eventName: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
    status: 'ongoing',
    organizer: 'GDG Campus Korea',
    startDate: new Date('2025-08-02T10:00:00'),
    endDate: new Date('2025-08-02T18:00:00'),
    location: '구글 스타트업 캠퍼스',
  },
  {
    id: 5,
    eventName: '나연 주호를 위한 마음챙김',
    status: 'ongoing',
    organizer: '요즘잘자쿨냥이',
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전 시작
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2시간 뒤 종료
    location: '온라인 Zoom',
  },
];

function Events() {
  const { data, isLoading } = useQueryCheckParticipation(EVENT_ID);

  if (isLoading) return <div>로딩중</div>;
  if (!data) throw new Error();

  console.log(data);

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="SharE:v" />
      <div className="wrapper my-2 flex h-12 items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          이벤트
          <span className="ml-1 inline-block font-semibold text-blue-500 dark:text-blue-400">
            1
          </span>
        </h3>
      </div>
      <div className="wrapper space-y-5">
        {events.map((event) => (
          <EventCard key={event.id} event={event} isParticipating={data.isParticipant} />
        ))}
      </div>
      <div className="h-14"></div>
    </div>
  );
}

export default Events;
