import EventProfileCard from '../card/EventProfileCard';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { EventProfileState } from '@/types';
import { EVENT_ID } from '@/constants/eventId';
import { useSuspenseQueryEventProfile } from '@/hooks/useQueryEventProfile';

interface MyEventProfileProps {
  onFlipChange: (flipped: boolean) => void;
}

export default function MyEventProfile({ onFlipChange }: MyEventProfileProps) {
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

  if (eventProfileError || !eventProfile) return <div>에러 발생</div>;

  return (
    <EventProfileCard
      state={eventProfileState}
      profile={eventProfile?.profile}
      eventName="CODE:ME"
      content={eventProfile?.content}
      fieldValues={fieldValues}
      onFieldChange={updateFieldValue}
      onActionButtonClick={eventProfileState === EventProfileState.EDIT ? handleSave : handleEdit}
      onCancelButtonClick={eventProfileState === EventProfileState.EDIT ? handleCancel : undefined}
      onFlipChange={onFlipChange}
    />
  );
}
