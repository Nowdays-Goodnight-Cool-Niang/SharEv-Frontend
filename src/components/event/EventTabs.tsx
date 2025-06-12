import { EventTabType } from '@/enums';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import EventTab from '@/components/event/EventTab';
import StackSvg from '@/assets/icons/ic_stack.svg?react';

export default function EventTabs() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div className="fixed z-10 flex items-center gap-1 px-4 py-3 ml-4 overflow-x-scroll bg-gray-900 rounded-full scroll-hide bottom-4">
      <EventTab
        isSelected={selected == EventTabType.profile}
        onClick={() => setSelected(EventTabType.profile)}
      >
        <StackSvg />
      </EventTab>
      <EventTab
        isSelected={selected == EventTabType.participant}
        onClick={() => setSelected(EventTabType.participant)}
      >
        <StackSvg />
      </EventTab>
      <EventTab
        isSelected={selected == EventTabType.QRCamera}
        onClick={() => setSelected(EventTabType.QRCamera)}
      >
        <StackSvg />
      </EventTab>
    </div>
  );
}
