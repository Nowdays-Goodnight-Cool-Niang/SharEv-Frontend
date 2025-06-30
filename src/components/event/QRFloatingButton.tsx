import { EventTabType } from '@/enums';
import { useEventTabsStore } from '@/stores/useEventTabStore';
import QRSvg from '@/assets/icons/ic_qr.svg?react';

export default function QRFloatingButton() {
  const { selected, setSelected } = useEventTabsStore();

  return (
    <div
      className={`absolute right-4 z-10 ml-4 overflow-x-scroll ${selected == EventTabType.QRCamera ? 'bg-orange-700/80 backdrop-blur-sm border border-orange-700' : 'bg-orange-500/60 border border-orange-300/40 backdrop-blur-sm'} scroll-hide bottom-4 rounded-xl`}
    >
      <button
        onClick={() => setSelected(EventTabType.QRCamera)}
        className={`relaive flex h-16 w-16 flex-col items-center justify-center whitespace-nowrap p-4 transition-colors duration-300`}
      >
        <QRSvg className='w-14 h-14' />
      </button>
    </div>
  );
}
