import Header from '@/components/common/Header';
import EventCard from '@/components/events/EventCard';

function Events() {
  return (
    <div className="background scroll-hide relative flex h-full flex-col bg-white dark:bg-gray-900">
      <Header title="행사" />
      <ul className="wrapper mt-4 flex flex-col">
        <EventCard />
      </ul>
    </div>
  );
}

export default Events;
