import EventTabs from '@/components/event/EventTabs';
import { useEventTabsStore } from '@/stores/useEventTabStore';

import ProfileSection from '@/components/event/profile/ProfileSection';
import ParticipantsSection from '@/components/event/participants/ParticipantsSection';
import ShareSection from '@/components/event/share/ShareSection';
import { EventTabType } from '@/constants/enums';

function Event() {
  const { selected } = useEventTabsStore();

  return (
    <>
      <div className="background scroll-hide relative flex h-full flex-col bg-slate-950 dark:bg-gray-900">
        {selected == EventTabType.profile && <ProfileSection />}
        {selected == EventTabType.participant && <ParticipantsSection />}
        {selected == EventTabType.QRCamera && <ShareSection />}
        <div className="background-min fixed bottom-0 z-10 w-full">
          <EventTabs />
        </div>
      </div>
    </>
  );
}

export default Event;
