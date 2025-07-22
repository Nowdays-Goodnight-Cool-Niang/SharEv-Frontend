import Header from '@/components/common/Header';
import EventCard from '@/components/events/EventCard';

const events = [
  {
    id: 1,
    eventName: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
    status: 'ongoing',
    organizer: 'GDG Campus Korea',
    participationStatus: 'not_participating',
    date: '2025.08.02 (토) 10:00',
    location: '구글 스타트업 캠퍼스',
  },
];

function Events() {
  return (
    <div className="background scroll-hide relative flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      <Header title="행사" />
      <div className="wrapper mt-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          행사 리스트
          <span className="ml-1 inline-block font-semibold text-blue-500">1</span>
        </h3>
        <div className="space-y-5">
          {events.map((event) => (
            <EventCard
              key={event.id}
              eventName={event.eventName}
              status={event.status}
              organizer={event.organizer}
              participationStatus={event.participationStatus}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
