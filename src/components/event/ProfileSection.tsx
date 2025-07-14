import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';
import { useQueryShareCard } from '@/hooks/useQueryShareCard';
import { useQueryAccount } from '@/hooks/useQueryAccount';
import BaseButton from '@/components/common/BaseButton';
import { useMutateShareCard } from '@/hooks/useMutateShareCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TOAST_MESSAGE } from '@/utils/labels';
import EventProfile from './EventProfile';
import BottomModal from '../common/BottonModal';
import TipDropDown from './\bTipDropDown';
import Header from '../common/Header';

function ProfileSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const { profile, isLoading: isProfileLoading, error: profileError } = useQueryAccount();
  const {
    participantInfo,
    isLoading: isParticipantInfoLoading,
    error: participantError,
  } = useQueryShareCard(profile?.id || '', {
    enabled: !!profile?.id,
  });

  const { mutate: saveShareCard } = useMutateShareCard();

  const { shareCardDetail, setShareCardDetail, isShareCardDetailBlank, editMode, setEditMode } =
    useShareCardDetailStore();

  useEffect(() => {
    // TODO: 초기값 null로 확실한지 확인하기
    if (participantInfo) {
      if (
        participantInfo.teamName !== '' &&
        participantInfo.teamName !== null &&
        participantInfo.position !== '' &&
        participantInfo.position !== null &&
        participantInfo.introductionText !== '' &&
        participantInfo.introductionText !== null
      ) {
        setShareCardDetail(participantInfo);
      } else {
        setIsExplainModalOpen(true);
        setEditMode(true);
      }
    }
  }, [participantInfo, setEditMode, setShareCardDetail]);

  if (isProfileLoading || isParticipantInfoLoading)
    return (
      <div className="w-full py-20">
        <LoadingSpinner />
      </div>
    );
  if (profileError || participantError || !participantInfo)
    return (
      <div className="tex-white">
        에러가 발생했습니다:
        {profileError?.message || participantError?.message}
      </div>
    );

  const handleSaveCardDetail = () => {
    if (shareCardDetail) {
      saveShareCard({
        teamName: shareCardDetail.teamName,
        position: shareCardDetail.position,
        introductionText: shareCardDetail.introductionText,
      });
      toast.success(TOAST_MESSAGE.PROFILE_SAVE_SUCCESS, { icon: '🎉' });
      setEditMode(false);
      setShareCardDetail(shareCardDetail);
    }
  };
  return (
    <>
      <Header title="내 명함" />
      <BottomModal isOpen={false} onClose={() => setIsExplainModalOpen(false)}>
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
        <EventProfile />
      </div>
    </>
  );
}

export default ProfileSection;
