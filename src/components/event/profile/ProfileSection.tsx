import { Suspense, useRef, useState } from 'react';
import BulbSvg from '@/assets/icons/ic_bulb.svg?react';
import DownloadSvg from '@/assets/icons/ic_download.svg?react';
import EventProfileCardSkeleton from '../card/EventProfileCardSkeleton';
import MyEventProfile from './MyEventProfile';
import ToolTip from '@/components/common/ToolTip';
import { useEventProfileStore } from '@/stores/useEventProfileStore';
import toast from 'react-hot-toast';
// import html2canvas from 'html2canvas';
import EventProfileGuideModal from '../modal/EventProfileGuideModal';
import IdeaModal from '../modal/EventProfileIdeaModal';

const NOTICE_TEXT = {
  flip: '카드를 눌러 뒤집어 보세요!',
  complete: '내용을 채워 나만의 명함을 완성하세요!',
};

function ProfileSection() {
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [_, setIsEditing] = useState(false);
  const [noticeText, setNoticeText] = useState(NOTICE_TEXT.flip);
  const domRef = useRef<HTMLDivElement>(null);
  const isProfileComplete = useEventProfileStore((state) => state.isProfileComplete);

  const handleFlip = (flipped: boolean) => {
    setNoticeText(() => {
      if (flipped) return NOTICE_TEXT.complete;
      else return NOTICE_TEXT.flip;
    });
  };

  // const downloadDomAsImage = async (element: HTMLElement) => {
  //   const canvas = await html2canvas(element, {
  //     useCORS: true, // 외부 이미지가 있을 경우 필요
  //     scale: 2, // 해상도 개선 (원하는 값으로 조절)
  //   });

  //   const dataUrl = canvas.toDataURL('image/png');

  //   const link = document.createElement('a');
  //   link.href = dataUrl;
  //   link.download = 'my-card.png';
  //   link.click();
  // };

  // const handleDownload = () => {
  //   if (!isProfileComplete || isEditing) {
  //     toast.success(
  //       !isProfileComplete ? '프로필을 완성해야 저장할 수 있어요!' : '편집 중에는 저장할 수 없어요!'
  //     );
  //     return;
  //   }
  //   if (domRef.current) {
  //     downloadDomAsImage(domRef.current);
  //     toast.success('프로필을 저장했어요!');
  //   }
  // };

  return (
    <div ref={domRef} className="">
      <EventProfileGuideModal isProfileComplete={isProfileComplete} />
      <IdeaModal isOpen={isIdeaModalOpen} onClose={() => setIsIdeaModalOpen(false)} />
      <div className="wrapper sticky top-14 z-20 my-2 flex h-12 items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">내 명함</h3>
        <button
          onClick={() => setIsIdeaModalOpen(true)}
          className="flex items-center justify-center gap-1 rounded-lg bg-blue-50 py-1 pl-2 pr-2.5"
        >
          <BulbSvg width={18} height={18} />
          <span className="text font-medium tracking-tight text-blue-500">TIP</span>
        </button>
      </div>

      <div className="wrapper flex h-full w-full flex-col items-center gap-5">
        <div className="flex h-full w-full flex-col items-center gap-3">
          <div className="relative flex w-full flex-col items-center">
            <Suspense fallback={<EventProfileCardSkeleton />}>
              <MyEventProfile onFlipChange={handleFlip} onEditStateChange={setIsEditing} />
              {!isProfileComplete && (
                <div className="absolute -bottom-10 flex w-full justify-center">
                  <ToolTip>{noticeText}</ToolTip>
                </div>
              )}
            </Suspense>
          </div>
        </div>
        <button
          onClick={() => toast.success('아직 준비 중이에요')}
          className="flex items-center justify-center gap-2 rounded-full bg-gray-100 px-5 py-3 font-medium tracking-tight text-gray-600 transition-colors duration-300 hover:bg-gray-200"
        >
          <DownloadSvg width={20} height={20} className="" />
          <span>저장하기</span>
        </button>
      </div>
    </div>
  );
}

export default ProfileSection;
