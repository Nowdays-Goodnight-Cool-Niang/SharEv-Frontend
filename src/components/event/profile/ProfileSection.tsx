import { Suspense, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryAccount } from '@/hooks/useQueryAccount';
import BaseButton from '@/components/common/BaseButton';
import { useMutateShareCard } from '@/hooks/useMutateShareCard';
import { TOAST_MESSAGE } from '@/utils/labels';
import EventProfileCard from '../card/EventProfileCard';
import BottomModal from '@/components/common/BottomModal';
import Header from '@/components/common/Header';
import NoticeInfo from '@/components/common/NoticeInfo';
import TipDropDown from './TipDropDown';
import EventProfileCardSkeleton from '../card/EventProfileCardSkeleton';
import { EventProfileState } from '@/types';
import { EVENT_ID } from '@/constants/eventId';
import { useSuspenseQueryEventProfile } from '@/hooks/useQueryEventProfile';

const NOTICE_TEXT = {
  flip: '카드를 눌러 뒤집어 보세요!',
  complete: '내용을 채워 나만의 명함을 완성하세요!',
};

function ProfileSection() {
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);

  const [noticeText, setNoticeText] = useState(NOTICE_TEXT.flip);
  const [eventProfileState, setEventProfileState] = useState<EventProfileState>(
    EventProfileState.READONLY
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const initialFieldValues = useRef<Record<string, string>>({});

  const { data: eventProfile, error: eventProfileError } = useSuspenseQueryEventProfile(EVENT_ID);

  useEffect(() => {
    if (!(eventProfileState === EventProfileState.EDIT) && eventProfile?.content?.fields) {
      const newFieldValues = Object.fromEntries(
        Object.entries(eventProfile.content.fields).map(([key, { value }]) => [key, value])
      );

      setFieldValues(newFieldValues);
      initialFieldValues.current = newFieldValues;
    }
  }, [eventProfile, eventProfileState]);

  const updateFieldValue = (key: string, newValue: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: newValue }));
  };

  const handleEdit = () => {
    initialFieldValues.current = fieldValues;
    setEventProfileState(EventProfileState.EDIT);
  };

  const handleSave = () => {
    // 실제 저장 로직이 있다면 여기에 (ex: API 호출)
    toast.success('저장되었습니다');
    setEventProfileState(EventProfileState.READONLY);
    initialFieldValues.current = fieldValues;
  };

  const handleCancel = () => {
    setFieldValues(initialFieldValues.current);
    setEventProfileState(EventProfileState.READONLY);
    toast('변경사항이 취소되었습니다');
  };

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
        {eventProfileError || !eventProfile?.profile ? (
          <div className="tex-white">에러가 발생했습니다:</div>
        ) : (
          <Suspense fallback={<EventProfileCardSkeleton />}>
            <EventProfileCard
              state={eventProfileState}
              profile={eventProfile?.profile}
              eventName="CODE:ME"
              content={eventProfile?.content}
              fieldValues={fieldValues}
              onFieldChange={updateFieldValue}
              onActionButtonClick={
                eventProfileState === EventProfileState.EDIT ? handleSave : handleEdit
              }
              onCancelButtonClick={
                eventProfileState === EventProfileState.EDIT ? handleCancel : undefined
              }
              onFlipChange={handleFlip}
            />
          </Suspense>
        )}

        <NoticeInfo>{noticeText}</NoticeInfo>
      </div>
    </div>
  );
}

export default ProfileSection;
