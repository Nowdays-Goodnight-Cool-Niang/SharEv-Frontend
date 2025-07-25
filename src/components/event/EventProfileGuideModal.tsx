import { useEffect, useState } from 'react';
import BottomModal from '@/components/common/BottomModal';
import BulbSvg from '@/assets/icons/ic_bulb.svg?react';
import { STORAGE_KEY } from '@/constants/key';
import { usePersistentFlag } from '@/hooks/usePersistentFlag';

interface EventProfileGuideModalProps {
  isProfileComplete: boolean;
}

export default function EventProfileGuideModal({ isProfileComplete }: EventProfileGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { value: hasSeenGuide, enable: markGuideAsSeen } = usePersistentFlag(
    STORAGE_KEY.HAS_SEEN_GUIDE
  );

  useEffect(() => {
    if (!isProfileComplete && !hasSeenGuide) {
      setIsOpen(true);
    }
  }, [isProfileComplete]);

  const handleClose = () => {
    markGuideAsSeen();
    setIsOpen(false);
  };

  return (
    <BottomModal isOpen={isOpen} onClose={handleClose}>
      <BottomModal.Header>
        <BottomModal.Title>무엇을 써야 할지 막막하다면? 🤔</BottomModal.Title>
        <BottomModal.Description>
          아래 내용을 참고해서 명함을 작성해도 좋아요!
        </BottomModal.Description>
      </BottomModal.Header>
      <BottomModal.Body>
        <BottomModal.Box>
          <GuideContent />
        </BottomModal.Box>
      </BottomModal.Body>
      <BottomModal.Footer>
        <BottomModal.Button onClick={handleClose}>확인했어요</BottomModal.Button>
      </BottomModal.Footer>
    </BottomModal>
  );
}

function GuideContent() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm font-medium leading-6 tracking-tight text-gray-500">
      <div className="flex aspect-square w-24 items-center justify-center rounded-full bg-white">
        <BulbSvg width={60} height={60} />
      </div>
      <div className="text-center">
        명함에 어떤 내용을 써야 할지 모르겠다면
        <br />
        상단의 "TIP 버튼"을 눌러 팁을 확인해 보세요!
      </div>
    </div>
  );
}
