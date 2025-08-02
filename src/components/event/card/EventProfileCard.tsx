import { useState } from 'react';
import EventProfileCardFront from './EventProfileCardFront';
import EventProfileCardBack from './EventProfileCardBack';
import { EventProfileStateType, IEventProfile } from '@/types/domain/event';
import { EventProfileState } from '@/constants/event';

interface EventProfileCardProps {
  state?: EventProfileStateType;
  profile: IEventProfile;
  eventName: string;
  fieldValues?: Record<string, string>; // edit | readonly 모드에서 필요
  onFieldChange?: (key: string, value: string) => void; // edit 모드에서 필요
  onActionButtonClick?: () => void; // edit 모드에서 필요
  onCancelButtonClick?: () => void; // edit 모드에서 필요
  onFlipChange?: (flipped: boolean) => void;
  showLinkIcons?: boolean;
  showButtons?: boolean;
  isActionButtonLoading?: boolean;
}

function EventProfileCard({
  state,
  profile,
  eventName,
  fieldValues,
  onFieldChange,
  onActionButtonClick,
  onCancelButtonClick,
  onFlipChange,
  showLinkIcons = false,
  showButtons = false,
  isActionButtonLoading = false,
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
      className="w-full max-w-[22rem] perspective-1000 hover:cursor-pointer"
    >
      <div
        className={`relative aspect-[5/7] w-full transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute inset-0 backface-hidden">
          <EventProfileCardFront profile={profile} state={state} eventName={eventName} />
        </div>
        {state !== EventProfileState.LOCKED && profile.type !== 'MINIMUM' && profile.template && (
          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            <EventProfileCardBack
              email={profile.email}
              socialLinks={profile.socialLinks}
              content={profile.template}
              fieldValues={fieldValues}
              state={state}
              onFieldChange={onFieldChange}
              onActionButtonClick={onActionButtonClick}
              onCancelButtonClick={onCancelButtonClick}
              isActionButtonDisabled={isActionButtonDisabled}
              isActionButtonLoading={isActionButtonLoading}
              showLinkIcons={showLinkIcons}
              showButtons={showButtons}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventProfileCard;
