import { IEventProfile } from '@/types/domain/event';
import EventProfileCard from './EventProfileCard';
import { EventProfileState } from '@/constants/event';

interface SpotlightCardProps {
  profile: IEventProfile;
  eventName: string;
  onClose: () => void;
}

export default function SpotlightCard({ profile, eventName, onClose }: SpotlightCardProps) {
  return (
    <div className="background fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <EventProfileCard
        state={EventProfileState.READONLY}
        profile={profile}
        eventName={eventName}
      />
    </div>
  );
}
