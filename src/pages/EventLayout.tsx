import { Outlet } from 'react-router';
import EventTabs from '@/components/event/EventTabs';
import Header from '@/components/common/Header';
import useScrollToTop from '@/hooks/useScrollToTop';

function EventLayout() {
  useScrollToTop();

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-white dark:bg-gray-900">
      <Header title="이벤트" showBackButton />
      <Outlet />
      <div className="h-28"></div>
      <div className="background-min fixed bottom-0 z-10 w-full">
        <EventTabs />
      </div>
    </div>
  );
}

export default EventLayout;
