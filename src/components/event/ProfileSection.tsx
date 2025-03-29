import { useEffect } from 'react';
import { useQueryShareCard } from '../../hooks/useQueryShareCard';
import ShareCard from './ShareCard';
import { useShareCardDetailStore } from '../../stores/useShareCardDetailStore';
import { useQueryAccount } from '../../hooks/useQueryAccount';
import { useProfileStore } from '../../stores/useProfileStore';
import BaseButton from '../common/BaseButton';

function ProfileSection() {
  const setProfile = useProfileStore((state) => state.setProfile);

  const shareCardDetail = useShareCardDetailStore((state) => state.shareCardDetail);
  const setShareCardDetail = useShareCardDetailStore((state) => state.setShareCardDetail);
  const editMode = useShareCardDetailStore((state) => state.editMode);

  const { profile, isLoading: isProfileLoading, error: profileError } = useQueryAccount();

  const {
    participantInfo,
    isLoading: isParticipantInfoLoading,
    error: participantError,
  } = useQueryShareCard(profile?.id || '', {
    enabled: !!profile?.id,
  });

  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  useEffect(() => {
    if (
      participantInfo &&
      participantInfo.teamName !== null &&
      participantInfo.position !== null &&
      participantInfo.introductionText !== null
    ) {
      setShareCardDetail(participantInfo);
    }
  }, [participantInfo, setShareCardDetail]);

  if (isProfileLoading || isParticipantInfoLoading) return <div>로딩 중...</div>;

  if (profileError || participantError || !participantInfo)
    return (
      <div>
        에러가 발생했습니다:
        {profileError?.message || participantError?.message}
      </div>
    );

  return (
    <div className="wrapper mt-11">
      <ShareCard />
      <div className="my-6"></div>
      {editMode && (
        <BaseButton
          isDisabled={
            shareCardDetail?.teamName == null ||
            shareCardDetail?.position == null ||
            shareCardDetail?.introductionText == null
          }
          onClick={() => {
            // 버튼 클릭 처리
          }}
        >
          프로필 완성하기
        </BaseButton>
      )}
    </div>
  );
}

export default ProfileSection;
