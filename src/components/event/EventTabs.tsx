import { EventTabType } from '@/constants/enums';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import EventTab from './EventTab';
import IdentificationSvg from '@/assets/icons/ic_identification.svg?react';
import QRSvg from '@/assets/icons/ic_qr.svg?react';
import WallerSvg from '@/assets/icons/ic_wallet.svg?react';
import IdentificationGraySvg from '@/assets/icons/ic_identification_gray.svg?react';
import QRGraySvg from '@/assets/icons/ic_qr_gray.svg?react';
import WallerGraySvg from '@/assets/icons/ic_wallet_gray.svg?react';

export default function EventTabs() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div className="flex h-14 w-full gap-2 rounded-t-2xl border-t border-gray-100 bg-white dark:bg-gray-800">
      <EventTab
        isSelected={selected === EventTabType.profile}
        onClick={() => setSelected(EventTabType.profile)}
      >
        {selected === EventTabType.profile ? (
          <IdentificationSvg width={24} height={24} />
        ) : (
          <IdentificationGraySvg width={24} height={24} />
        )}
        <span>내 명함</span>
      </EventTab>
      <EventTab
        isSelected={selected === EventTabType.participant}
        onClick={() => setSelected(EventTabType.participant)}
      >
        {selected === EventTabType.participant ? (
          <WallerSvg width={24} height={24} />
        ) : (
          <WallerGraySvg width={24} height={24} />
        )}
        <span>참가자 명함</span>
      </EventTab>
      <EventTab
        isSelected={selected === EventTabType.QRCamera}
        onClick={() => setSelected(EventTabType.QRCamera)}
      >
        {selected === EventTabType.QRCamera ? (
          <QRSvg width={24} height={24} />
        ) : (
          <QRGraySvg width={24} height={24} />
        )}
        <span>명함 공유</span>
      </EventTab>
    </div>
  );
}
