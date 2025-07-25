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
      <BottomModal.Title>이제 나만의 명함을 만들어 볼까요?</BottomModal.Title>
      <BottomModal.Description>
        이번 행사에서 나를 가장 잘 보여줄 수 있는
        <br /> 명함을 만들어보세요.
      </BottomModal.Description>
      <BottomModal.Box>
        <GuideContent />
      </BottomModal.Box>
      <BottomModal.Button onClick={handleClose}>확인했어요</BottomModal.Button>
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
