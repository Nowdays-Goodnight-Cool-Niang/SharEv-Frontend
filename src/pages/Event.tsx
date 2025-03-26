import EventTabs from '../components/event/EventTabs';
import { useEventTabsStore } from '../stores/useEventTabStore';
import { EventTabType } from '../enums';
import ProfileSection from '../components/event/ProfileSection';
import ParticipantSection from '../components/event/ParticipantSection';

function Event() {
  const { selected } = useEventTabsStore();

  return (
    <div className="background bg-gray-800">
      <EventTabs />
      {selected == EventTabType.profile && <ProfileSection />}
      {selected == EventTabType.participant && <ParticipantSection />}
    </div>
  );
}

export default Event;
