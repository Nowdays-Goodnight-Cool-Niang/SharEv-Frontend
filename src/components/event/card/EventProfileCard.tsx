import { useState } from 'react';
import { EventProfileState, IEventProfileContent, IProfile } from '@/types';
import EventProfileCardFront from './EventProfileCardFront';
import EventProfileCardBack from './EventProfileCardBack';

interface EventProfileCardProps {
  state?: EventProfileState;
  profile: IProfile;
  eventName: string;
  graphicNumber: number;
  content?: IEventProfileContent; // edit | readonly 모드에서 필요
  fieldValues?: Record<string, string>; // edit | readonly 모드에서 필요
  onFieldChange?: (key: string, value: string) => void; // edit 모드에서 필요
  onActionButtonClick?: () => void; // edit 모드에서 필요
  onCancelButtonClick?: () => void; // edit 모드에서 필요
  onFlipChange?: (flipped: boolean) => void;
}

function EventProfileCard({
  state,
  profile,
  eventName,
  graphicNumber,
  content,
  fieldValues,
  onFieldChange,
  onActionButtonClick,
  onCancelButtonClick,
  onFlipChange,
}: EventProfileCardProps) {
  const [flipped, setFlipped] = useState(false);

  const isActionButtonDisabled =
    state === EventProfileState.EDIT &&
    !Object.values(fieldValues ?? {}).every((v) => v !== null && v.trim() !== '');

  const handleFlip = () => {
    setFlipped((prev) => {
      const next = !prev;
      onFlipChange?.(next);
      return next;
    });
  };

  return (
    <div
      onClick={() => {
        // 읽기 전용일 때는 언제나 가능 + 뒤집혀 있을 때는 편집 중일 때
        if (state === EventProfileState.READONLY || (state === EventProfileState.EDIT && !flipped))
          handleFlip();
      }}
      className="w-full max-w-[22rem] perspective-1000"
    >
      <div
        className={`relative aspect-[5/7] w-full transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute inset-0 backface-hidden">
          <EventProfileCardFront
            profile={profile}
            state={state}
            eventName={eventName}
            graphicNumber={graphicNumber}
          />
        </div>
        {state !== EventProfileState.LOCKED && content && (
          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <EventProfileCardBack
              content={content}
              fieldValues={fieldValues}
              state={state}
              onFieldChange={onFieldChange}
              onActionButtonClick={onActionButtonClick}
              onCancelButtonClick={onCancelButtonClick}
              isActionButtonDisabled={isActionButtonDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventProfileCard;
