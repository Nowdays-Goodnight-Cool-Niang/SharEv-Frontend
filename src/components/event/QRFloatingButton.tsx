import { EventTabType } from '@/enums';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import QRSvg from '@/assets/icons/ic_qr.svg?react';

export default function QRFloatingButton() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div
      className={`fixed z-10 ml-4 overflow-x-scroll ${selected == EventTabType.QRCamera ? 'bg-orange-500' : 'bg-orange-700'} scroll-hide bottom-4 rounded-full`}
    >
      <button
        onClick={() => setSelected(EventTabType.QRCamera)}
        className={`relaive flex h-12 w-12 flex-col items-center justify-center whitespace-nowrap p-3 transition-colors duration-300`}
      >
        <QRSvg />
      </button>
    </div>
  );
}
