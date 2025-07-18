import EventTabs from '@/components/event/EventTabs';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import { EventTabType } from '@/enums';
import ProfileSection from '@/components/event/ProfileSection';
import ParticipantsSection from '@/components/event/ParticipantsSection';
import ShareSection from '@/components/event/ShareSection';

function Event() {
  const { selected } = useEventTabsStore();

  return (
    <>
      <div className="background scroll-hide relative flex h-full flex-col bg-white">
        {selected == EventTabType.profile && <ProfileSection />}
        {selected == EventTabType.participant && <ParticipantsSection />}
        {selected == EventTabType.QRCamera && <ShareSection />}
        <div className="absolute bottom-0 z-10 w-full">
          <EventTabs />
        </div>
      </div>
    </>
  );
}

export default Event;
