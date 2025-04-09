import { useEffect, useState } from 'react';
import { useQueryShareCard } from '../../hooks/useQueryShareCard';
import { useShareCardDetailStore } from '../../stores/useShareCardDetailStore';
import { useQueryAccount } from '../../hooks/useQueryAccount';
import { useProfileStore } from '../../stores/useProfileStore';
import BaseButton from '../common/BaseButton';
import { useMutateShareCard } from '../../hooks/useMutateShareCard';
import toast from 'react-hot-toast';
import ShareCard from './ShareCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Modal from '../common/Modal';
import NoticeInfo from '../common/NoticeInfo';

function ProfileSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile, isLoading: isProfileLoading, error: profileError } = useQueryAccount();
  const {
    participantInfo,
    isLoading: isParticipantInfoLoading,
    error: participantError,
  } = useQueryShareCard(profile?.id || '', {
    enabled: !!profile?.id,
  });

  const { mutate: saveShareCard } = useMutateShareCard();

  const { setProfile } = useProfileStore();
  const { shareCardDetail, setShareCardDetail, isShareCardDetailBlank, editMode, setEditMode } =
    useShareCardDetailStore();

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

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
        setIsModalOpen(true);
        setEditMode(true);
      }
    }
  }, [participantInfo, setEditMode, setShareCardDetail]);

  if (isProfileLoading || isParticipantInfoLoading) return <LoadingSpinner />;

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
      toast.success('프로필을 저장했습니다');
      setEditMode(false);
      setShareCardDetail(shareCardDetail);
    }
  };
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <span className="text-body-2 text-center text-gray-100">
          이번 행사에서 사용할 나만의 프로필을 완성해 보세요! 등록한 행사 프로필은 언제든지 수정
          가능해요.
        </span>
        <BaseButton onClick={() => setIsModalOpen(false)}>알겠습니다</BaseButton>
      </Modal>
      <div className="wrapper mt-11 flex flex-col items-center overflow-x-hidden">
        <NoticeInfo>
          프로필을 모두 입력하면, QR을 통해 서로의 프로필을 확인할 수 있어요. 카메라로 QR을 스캔해
          행사장에 있는 사람들의 프로필을 확인해보세요.
        </NoticeInfo>
        <div className="my-2"></div>
        <ShareCard profile={profile} isReveal={true} isOpen={true} mode="edit" />
        <div className="my-6"></div>
        {editMode && (
          <BaseButton isDisabled={isShareCardDetailBlank()} onClick={handleSaveCardDetail}>
            프로필 완성하기
          </BaseButton>
        )}
      </div>
    </>
  );
}

export default ProfileSection;
