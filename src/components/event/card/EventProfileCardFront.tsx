import { EventProfileState, IProfile } from '@/types';
import { getGraphicImageByNumber } from '@/utils/graphic';

interface EventProfileCardFrontProps {
  state?: EventProfileState;
  profile: IProfile;
  eventName: string;
  graphicNumber: number;
}

function EventProfileCardFront({
  state = EventProfileState.LOCKED,
  profile,
  eventName,
  graphicNumber,
}: EventProfileCardFrontProps) {
  return (
    <div
      className={`relative h-full w-full min-w-60 overflow-hidden rounded-3xl ${state === EventProfileState.LOCKED ? 'bg-gray-200' : 'bg-gradient-to-br from-blue-500 to-blue-400'} transform-style-3d`}
    >
      <div className="absolute -bottom-10 flex aspect-square w-full flex-col items-end justify-end">
        <div className="w-[36rem] translate-x-48 translate-y-20">
          <img
            src={getGraphicImageByNumber(graphicNumber)}
            className="aspect-square w-full"
            alt=""
          />
        </div>
      </div>
      <div className="absolute inset-0 w-full pl-6 pr-6 pt-10">
        <p className="mb-2 w-full text-xl leading-7 tracking-tight text-white/50">{eventName}</p>
        <p className="mb-8 w-full text-3xl font-semibold leading-7 tracking-tight text-white">
          {profile.name}
        </p>
      </div>
    </div>
  );
}

export default EventProfileCardFront;
