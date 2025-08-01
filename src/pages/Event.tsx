import EventTabs from '@/components/event/EventTabs';
import { useEventTabsStore } from '@/stores/useEventTabStore';

import ProfileSection from '@/components/event/profile/ProfileSection';
import ParticipantsSection from '@/components/event/participants/ParticipantsSection';
import ShareSection from '@/components/event/share/ShareSection';
import { EventTabType } from '@/constants/event';
import Header from '@/components/common/Header';
import useScrollToTop from '@/hooks/useScrollToTop';

function Event() {
  useScrollToTop();
  const { selected } = useEventTabsStore();

  return (
    <>
      <div className="background scroll-hide relative flex min-h-full flex-col bg-white dark:bg-gray-900">
        <Header title="이벤트" showBackButton />
        {selected == EventTabType.profile && <ProfileSection />}
        {selected == EventTabType.participant && <ParticipantsSection />}
        {selected == EventTabType.QRCamera && <ShareSection />}
        <div className="h-28"></div>
        <div className="background-min fixed bottom-0 z-10 w-full">
          <EventTabs />
        </div>
      </div>
    </>
  );
}

export default Event;
