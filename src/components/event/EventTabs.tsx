import { EventTabType } from '../../enums';
import { useEventTabsStore } from '../../stores/useEventTabStore';
import EventTab from './EventTab';

export default function EventTabs() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div className="flex items-center gap-2 bg-gray-900 px-6 py-3">
      <EventTab
        isSelected={selected == EventTabType.profile}
        onClick={() => setSelected(EventTabType.profile)}
      >
        내 행사 프로필
      </EventTab>
      <EventTab
        isSelected={selected == EventTabType.participant}
        onClick={() => setSelected(EventTabType.participant)}
      >
        참여하는 사람들
      </EventTab>
    </div>
  );
}
