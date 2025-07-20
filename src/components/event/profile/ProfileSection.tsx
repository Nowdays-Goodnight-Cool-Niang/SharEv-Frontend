import { Suspense, useState } from 'react';
import BaseButton from '@/components/common/BaseButton';
import BottomModal from '@/components/common/BottomModal';
import Header from '@/components/common/Header';
import NoticeInfo from '@/components/common/NoticeInfo';
import TipDropDown from './TipDropDown';
import EventProfileCardSkeleton from '../card/EventProfileCardSkeleton';
import MyEventProfile from './MyEventProfile';

const NOTICE_TEXT = {
  flip: '카드를 눌러 뒤집어 보세요!',
  complete: '내용을 채워 나만의 명함을 완성하세요!',
};

function ProfileSection() {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);

  const [noticeText, setNoticeText] = useState(NOTICE_TEXT.flip);

  const handleFlip = (flipped: boolean) => {
    setNoticeText(() => {
      if (flipped) return NOTICE_TEXT.complete;
      else return NOTICE_TEXT.flip;
    });
  };

  return (
    <div className="">
      <Header title="내 명함" />
      <BottomModal isOpen={isExplainModalOpen} onClose={() => setIsExplainModalOpen(false)}>
        <p className="mb-2 text-xl font-semibold tracking-tight text-gray-700">
          이제 명함을 만들어 볼까요?
        </p>
        <p className="mb-12 text-sm leading-6 tracking-tight text-gray-500">
          이번 행사에서 보여줄 나만의 명함을 완성하세요.
          <br />
          나를 가장 잘 드러낼 수 있도록 작성해 보세요.
        </p>
        <BaseButton onClick={() => setIsExplainModalOpen(false)}>확인했어요</BaseButton>
      </BottomModal>
      <div className="wrapper flex h-full w-full flex-col items-center gap-4 overflow-x-hidden pb-12 pt-2">
        <TipDropDown />
        <Suspense fallback={<EventProfileCardSkeleton />}>
          <MyEventProfile onFlipChange={handleFlip} />
        </Suspense>

        <NoticeInfo>{noticeText}</NoticeInfo>
      </div>
    </div>
  );
}

export default ProfileSection;
