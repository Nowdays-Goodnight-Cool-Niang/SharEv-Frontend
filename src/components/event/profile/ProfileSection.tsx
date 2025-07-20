import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useShareCardDetailStore } from '@/stores/useShareCardDetailStore';
import { useQueryShareCard } from '@/hooks/useQueryShareCard';
import { useQueryAccount } from '@/hooks/useQueryAccount';
import BaseButton from '@/components/common/BaseButton';
import { useMutateShareCard } from '@/hooks/useMutateShareCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TOAST_MESSAGE } from '@/utils/labels';
import EventProfileCard from '../card/EventProfileCard';
import BottomModal from '../../common/BottonModal';
import Header from '../../common/Header';
import { EventProfileCardState, IEventProfileCardTemplate, IProfile } from '@/types';
import NoticeInfo from '../../common/NoticeInfo';
import TipDropDown from './TipDropDown';
import EventProfileCardSkeleton from '../card/EventProfileCardSkeleton';

/**
 * skeleton UI 만들기
 * 링크 연결 고치기
 */

const profile: IProfile = {
  name: '김주호',
  email: 'zuhu@gmail.com',
  socialLinks: {
    github: 'https://github.com/zuhu',
    instagram: 'https://instagram.com/zuhu',
  },
};

const template: IEventProfileCardTemplate = {
  blocks: [
    { type: 'text', value: '안녕하세요. 저는 ' },
    { type: 'input', fieldKey: 'intro' },
    { type: 'text', value: ' 개발자입니다. 개발을 하면서 가장 힘들었던 경험은 ' },
    { type: 'input', fieldKey: 'hardestMoment' },
    { type: 'text', value: ' 고, 가장 뿌듯했던 경험은 ' },
    { type: 'input', fieldKey: 'proudestMoment' },
    { type: 'text', value: ' 입니다.' },
  ],
  fields: {
    intro: {
      value: '백엔드',
      placeholder: '스스로를 한 문장으로 소개해 보세요',
    },
    hardestMoment: {
      value: '',
      placeholder: '힘들었던 경험을 적어주세요',
    },
    proudestMoment: {
      value: '',
      placeholder: '뿌듯했던 경험을 적어주세요',
    },
  },
};

const NOTICE_TEXT = {
  flip: '카드를 눌러 뒤집어 보세요!',
  complete: '내용을 채워 나만의 명함을 완성하세요!',
};

function ProfileSection() {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [noticeText, setNoticeText] = useState(NOTICE_TEXT.flip);
  const [cardState, setCardState] = useState<EventProfileCardState>(EventProfileCardState.READONLY);

  const [fieldValues, setFieldValues] = useState(
    Object.fromEntries(Object.entries(template.fields).map(([key, { value }]) => [key, value]))
  );

  const initialFieldValues = useRef(fieldValues);
  const isEditing = cardState === EventProfileCardState.EDIT;

  const updateFieldValue = (key: string, newValue: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleEdit = () => {
    initialFieldValues.current = fieldValues;
    setCardState(EventProfileCardState.EDIT);
  };

  const handleSave = () => {
    // 실제 저장 로직이 있다면 여기에 (ex: API 호출)
    toast.success('저장되었습니다');
    setCardState(EventProfileCardState.READONLY);
    initialFieldValues.current = fieldValues;
  };

  const handleCancel = () => {
    setFieldValues(initialFieldValues.current);
    setCardState(EventProfileCardState.READONLY);
    toast('변경사항이 취소되었습니다');
  };

  const handleFlip = (flipped: boolean) => {
    setNoticeText(() => {
      if (flipped) return NOTICE_TEXT.complete;
      else return NOTICE_TEXT.flip;
    });
  };

  // const { profile, isLoading: isProfileLoading, error: profileError } = useQueryAccount();
  // const {
  //   participantInfo,
  //   isLoading: isParticipantInfoLoading,
  //   error: participantError,
  // } = useQueryShareCard(profile?.id || '', {
  //   enabled: !!profile?.id,
  // });

  // const { mutate: saveShareCard } = useMutateShareCard();

  // const { shareCardDetail, setShareCardDetail, isShareCardDetailBlank, editMode, setEditMode } =
  //   useShareCardDetailStore();

  // useEffect(() => {
  //   // TODO: 초기값 null로 확실한지 확인하기
  //   if (participantInfo) {
  //     if (
  //       participantInfo.teamName !== '' &&
  //       participantInfo.teamName !== null &&
  //       participantInfo.position !== '' &&
  //       participantInfo.position !== null &&
  //       participantInfo.introductionText !== '' &&
  //       participantInfo.introductionText !== null
  //     ) {
  //       setShareCardDetail(participantInfo);
  //     } else {
  //       setIsExplainModalOpen(true);
  //       setEditMode(true);
  //     }
  //   }
  // }, [participantInfo, setEditMode, setShareCardDetail]);

  // if (isProfileLoading || isParticipantInfoLoading)
  //   return (
  //     <div className="w-full py-20">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // if (profileError || participantError || !participantInfo)
  //   return (
  //     <div className="tex-white">
  //       에러가 발생했습니다:
  //       {profileError?.message || participantError?.message}
  //     </div>
  //   );

  // const handleSaveCardDetail = () => {
  //   if (shareCardDetail) {
  //     saveShareCard({
  //       teamName: shareCardDetail.teamName,
  //       position: shareCardDetail.position,
  //       introductionText: shareCardDetail.introductionText,
  //     });
  //     toast.success(TOAST_MESSAGE.PROFILE_SAVE_SUCCESS, { icon: '🎉' });
  //     setEditMode(false);
  //     setShareCardDetail(shareCardDetail);
  //   }
  // };
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
        <EventProfileCard
          state={cardState}
          profile={profile}
          eventName="CODE:ME"
          template={template}
          fieldValues={fieldValues}
          onFieldChange={updateFieldValue}
          onActionButtonClick={isEditing ? handleSave : handleEdit}
          onCancelButtonClick={isEditing ? handleCancel : undefined}
          onFlipChange={handleFlip}
        />
        <EventProfileCardSkeleton />
        <NoticeInfo>{noticeText}</NoticeInfo>
      </div>
    </div>
  );
}

export default ProfileSection;
