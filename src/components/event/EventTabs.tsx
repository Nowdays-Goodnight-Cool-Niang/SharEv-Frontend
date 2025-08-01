import { EventTabType } from '@/constants/event';
import { trackTabClick } from '@/utils/analytics';
import EventTab from './EventTab';
import IdentificationSvg from '@/assets/icons/ic_identification.svg?react';
import QRSvg from '@/assets/icons/ic_qr.svg?react';
import WallerSvg from '@/assets/icons/ic_wallet.svg?react';
import IdentificationGraySvg from '@/assets/icons/ic_identification_gray.svg?react';
import QRGraySvg from '@/assets/icons/ic_qr_gray.svg?react';
import WallerGraySvg from '@/assets/icons/ic_wallet_gray.svg?react';
import { useLocation, useNavigate } from 'react-router';

export default function EventTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.split('/').pop();

  const tabs = [
    {
      key: EventTabType.profile,
      label: '내 명함',
      path: 'profile',
      icon: IdentificationSvg,
      iconGray: IdentificationGraySvg,
    },
    {
      key: EventTabType.participant,
      label: '참가자 명함',
      path: 'participant',
      icon: WallerSvg,
      iconGray: WallerGraySvg,
    },
    {
      key: EventTabType.QRCamera,
      label: '명함 공유',
      path: 'share',
      icon: QRSvg,
      iconGray: QRGraySvg,
    },
  ];

  const handleTabClick = (path: string, tab: (typeof tabs)[number]) => {
    if (currentPath !== path) {
      trackTabClick(tab.label, {
        tab_type: tab.key,
        previous_tab: currentPath,
        event_page: 'event_detail',
      });
      navigate(`/event/${path}`, { replace: true });
    }
  };

  return (
    <div className="flex h-14 w-full gap-2 rounded-t-2xl border-t border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
      {tabs.map((tab) => {
        const isSelected = currentPath === tab.path;
        const Icon = isSelected ? tab.icon : tab.iconGray;

        return (
          <EventTab
            key={tab.key}
            isSelected={isSelected}
            onClick={() => handleTabClick(tab.path, tab)}
          >
            <Icon width={24} height={24} className={!isSelected ? 'dark:opacity-40' : ''} />
            <span>{tab.label}</span>
          </EventTab>
        );
      })}
    </div>
  );
}
