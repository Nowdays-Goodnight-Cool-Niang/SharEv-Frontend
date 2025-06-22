import EventTabs from '@/components/event/EventTabs';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import { EventTabType } from '@/enums';
import ProfileSection from '@/components/event/ProfileSection';
import ParticipantSection from '@/components/event/ParticipantSection';
import QRCameraSection from '@/components/event/QRCameraSection';

function Event() {
  const { selected } = useEventTabsStore();

  return (
    <div className="flex flex-col h-full bg-gray-800 scroll-hide">
      <EventTabs />
      {selected == EventTabType.profile && <ProfileSection />}
      {selected == EventTabType.participant && <ParticipantSection />}
      {selected == EventTabType.QRCamera && <QRCameraSection />}
    </div>
  );
}

export default Event;
