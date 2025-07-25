import { EventProfileState, IEventProfile } from '@/types/common/ui';
import EventProfileCard from './EventProfileCard';

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
        graphicNumber={profile.imageIndex}
        content={profile.content}
      />
    </div>
  );
}
