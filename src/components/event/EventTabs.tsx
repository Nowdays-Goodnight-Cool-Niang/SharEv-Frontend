import { EventTabType } from '@/enums';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import EventTab from '@/components/event/EventTab';

export default function EventTabs() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div className="sticky top-0 z-10 flex items-center gap-2 px-6 py-3 overflow-x-scroll bg-gray-900 scroll-hide">
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
