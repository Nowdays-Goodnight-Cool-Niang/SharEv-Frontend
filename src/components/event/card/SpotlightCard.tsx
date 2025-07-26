import { IEventProfile } from '@/types/domain/event';
import EventProfileCard from './EventProfileCard';
import { EventProfileState } from '@/constants/event';
import BaseButton from '@/components/common/BaseButton';

interface SpotlightCardProps {
  profile: IEventProfile;
  eventName: string;
  onClose: () => void;
  showLinkIcons?: boolean;
}

export default function SpotlightCard({
  profile,
  eventName,
  onClose,
  showLinkIcons = false,
}: SpotlightCardProps) {
  return (
    <div className="background fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="wrapper z-10 flex w-full flex-col items-center gap-6">
        <EventProfileCard
          state={EventProfileState.READONLY}
          profile={profile}
          eventName={eventName}
          showLinkIcons={showLinkIcons}
        />
        <BaseButton variant="white" onClick={onClose}>
          닫기
        </BaseButton>
      </div>
    </div>
  );
}
