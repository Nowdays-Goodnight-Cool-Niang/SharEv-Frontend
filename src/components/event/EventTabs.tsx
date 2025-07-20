import { EventTabType } from '@/constants/enums';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import EventTab from '@/components/event/EventTab';
import IdentificationSvg from '@/assets/icons/ic_identification.svg?react';
import QRSvg from '@/assets/icons/ic_qr.svg?react';
import WallerSvg from '@/assets/icons/ic_wallet.svg?react';

export default function EventTabs() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div className="flex h-14 w-full items-center gap-2 rounded-t-xl border-t border-gray-100/10 bg-black/40 px-1 shadow-[0_-3px_10px_rgba(0,0,0,0.02)] backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <EventTab
        isSelected={selected == EventTabType.profile}
        onClick={() => setSelected(EventTabType.profile)}
      >
        <div className="flex flex-col items-center gap-0.5">
          <IdentificationSvg width={24} height={24} />
          <span>내 명함</span>
        </div>
      </EventTab>
      <EventTab
        isSelected={selected == EventTabType.participant}
        onClick={() => setSelected(EventTabType.participant)}
      >
        <div className="flex flex-col items-center gap-0.5">
          <WallerSvg width={24} height={24} />
          <span>참가자 명함</span>
        </div>
      </EventTab>
      <EventTab
        isSelected={selected == EventTabType.QRCamera}
        onClick={() => setSelected(EventTabType.QRCamera)}
      >
        <div className="flex flex-col items-center gap-0.5">
          <QRSvg width={24} height={24} />
          <span>명함 공유</span>
        </div>
      </EventTab>
    </div>
  );
}
