import { Suspense, useEffect, useRef, useState } from 'react';
import BaseButton from '@/components/common/BaseButton';
import BottomModal from '@/components/common/BottomModal';
import BulbSvg from '@/assets/icons/ic_bulb.svg?react';
import DownloadSvg from '@/assets/icons/ic_download.svg?react';
import EventProfileCardSkeleton from '../card/EventProfileCardSkeleton';
import MyEventProfile from './MyEventProfile';
import ToolTip from '@/components/common/ToolTip';
import { useEventProfileStore } from '@/stores/useEventProfileStore';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';

const NOTICE_TEXT = {
  flip: '카드를 눌러 뒤집어 보세요!',
  complete: '내용을 채워 나만의 명함을 완성하세요!',
};

const tips = [
  {
    emoji: '🧑‍💻',
    title: '저는 이런 개발자예요',
    items: [
      '커피를 좋아하는',
      '문제 해결을 좋아하고 책임감 있게 일하는',
      '새로운 기술을 배우는 걸 즐기고 빠르게 적응하는',
    ],
  },
  {
    emoji: '🏆',
    title: '가장 뿌듯했던 경험',
    items: [
      '혼자서 사이드 프로젝트를 기획부터 배포까지 해냈을 때',
      '서비스 성능을 개선해 사용자 만족도를 높였을 때',
      '팀 프로젝트에서 리더를 맡아 성공적으로 마무리했을 때',
    ],
  },
  {
    emoji: '🧗‍♂️',
    title: '가장 힘들었던 경험',
    items: [
      '기한이 촉박한 프로젝트를 야근하면서 마무리했을 때',
      '문제를 해결하는 데 시간이 오래 걸렸을 때',
      '소통이 부족한 팀에서 갈등을 조율하며 일했을 때',
    ],
  },
];

function ProfileSection() {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [noticeText, setNoticeText] = useState(NOTICE_TEXT.flip);
  const domRef = useRef<HTMLDivElement>(null);
  const isProfileComplete = useEventProfileStore((state) => state.isProfileComplete);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('seenEventProfileModal');
    if (!isProfileComplete && hasSeenModal != 'true') {
      setIsExplainModalOpen(true);
    }
  }, [isProfileComplete]);

  const handleFlip = (flipped: boolean) => {
    setNoticeText(() => {
      if (flipped) return NOTICE_TEXT.complete;
      else return NOTICE_TEXT.flip;
    });
  };

  const downloadDomAsImage = async (element: HTMLElement) => {
    const canvas = await html2canvas(element, {
      useCORS: true, // 외부 이미지가 있을 경우 필요
      scale: 2, // 해상도 개선 (원하는 값으로 조절)
    });

    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'my-card.png';
    link.click();
  };

  function handleCloseExplainModal() {
    sessionStorage.setItem('seenEventProfileModal', 'true');
    setIsExplainModalOpen(false);
  }

  return (
    <div ref={domRef} className="">
      <BottomModal isOpen={isExplainModalOpen} onClose={handleCloseExplainModal}>
        <p className="mb-2 flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-700">
          <span>이제 나만의 명함을 만들어 볼까요?</span>
        </p>
        <p className="mb-6 leading-7 tracking-tight text-gray-600">
          이번 행사에서 나를 가장 잘 보여줄 수 있는
          <br /> 명함을 만들어보세요.
        </p>
        <div className="mb-10 flex flex-col items-center rounded-xl bg-gray-50 p-6">
          <div className="flex w-full flex-col items-center gap-4 text-sm font-medium leading-6 tracking-tight text-gray-500">
            <div className="flex aspect-square w-24 flex-col items-center justify-center rounded-full bg-white">
              <BulbSvg width={60} height={60} />
            </div>
            <div className="flex-1 text-center">
              명함에 어떤 내용을 써야 할지 모르겠다면
              <br />
              상단의 "TIP 버튼"을 눌러 팁을 확인해 보세요!
            </div>
          </div>
        </div>

        <BaseButton onClick={handleCloseExplainModal}>확인했어요</BaseButton>
      </BottomModal>

      <BottomModal isOpen={isIdeaModalOpen} onClose={() => setIsIdeaModalOpen(false)}>
        <p className="mb-2 flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-700">
          <span> 무엇을 써야 할지 막막하다면? 🤔</span>
        </p>
        <p className="mb-6 leading-7 tracking-tight text-gray-600">
          아래 내용을 참고해서 명함을 작성해도 좋아요!
        </p>
        <div className="mb-10 rounded-xl bg-gray-50 p-6">
          {tips.map((tip, idx) => (
            <div className="pb-3" key={idx}>
              <p className="mb-1 text-sm font-medium leading-7 tracking-tight text-gray-800 dark:text-gray-300">
                <span className="mr-2">{tip.emoji}</span>
                {tip.title}
              </p>
              <ul className="text-sm leading-6 tracking-tight text-gray-500 dark:text-gray-300">
                {tip.items.map((item, i) => (
                  <li className="" key={i}>
                    - {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <BaseButton onClick={() => setIsIdeaModalOpen(false)}>알겠습니다!</BaseButton>
      </BottomModal>
      <div className="wrapper sticky top-14 z-20 my-2 flex h-12 items-center justify-between gap-3 bg-white">
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
          onClick={() => {
            if (!isProfileComplete || isEditing) {
              toast.success(
                !isProfileComplete
                  ? '프로필을 완성해야 저장할 수 있어요!'
                  : '편집 중에는 저장할 수 없어요!'
              );
              return;
            }
            if (domRef.current) {
              downloadDomAsImage(domRef.current);
              toast.success('프로필을 저장했어요!');
            }
          }}
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
