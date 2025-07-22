import { EVENT_ID } from '@/constants/eventId';
import { useQueryParticipateInEvent } from '@/hooks/useQueryParticipateInEventMutation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import ClockSvg from '@/assets/icons/ic_clock.svg?react';
import LocationSvg from '@/assets/icons/ic_location.svg?react';

function EventCard({ eventName, status, organizer, participationStatus, date, location }) {
  const navigate = useNavigate();
  const { mutate } = useQueryParticipateInEvent();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-blue-50 text-blue-500';
      case 'upcoming':
        return 'bg-gray-50 text-gray-600';
      case 'ended':
        return 'bg-gray-50 text-gray-400';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing':
        return '진행중';
      case 'upcoming':
        return '예정';
      case 'ended':
        return '종료';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div className="rounded-3xl bg-white px-6 py-6">
      <ul className="mb-4 flex gap-1.5">
        <div
          className={`flex h-8 w-fit flex-col items-center justify-center rounded-lg px-3 text-sm font-medium ${getStatusColor(status)}`}
        >
          {getStatusText(status)}
        </div>
        <div
          className={`flex h-8 w-fit flex-col items-center justify-center rounded-lg bg-gray-100 px-3 text-sm font-medium text-gray-400`}
        >
          미참여
        </div>
      </ul>
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-medium leading-7 tracking-tight text-gray-900">
            {eventName}
          </h3>
          <p className="text-sm leading-6 tracking-tight text-gray-600">{organizer}</p>
        </div>

        <div className="mb-6 space-y-2.5 rounded-xl bg-gray-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ClockSvg width={16} height={16} />
            <span>{date}</span>
          </div>
          <hr className="border-gray-100" />

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LocationSvg width={16} height={16} />
            <span>{location}</span>
          </div>
        </div>

        <button
          onClick={() => {
            mutate(EVENT_ID, {
              onSuccess: () => toast.success('행사에 참여하였습니다!'),
              onError: () => navigate('/event'),
            });
          }}
          disabled={status === 'ended'}
          className={`h-14 w-full rounded-2xl px-5 font-medium transition-colors ${
            status === 'ended'
              ? 'cursor-not-allowed bg-gray-100 text-gray-400'
              : false
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {status === 'ended' ? '종료됨' : false ? '참여취소' : '참여하기'}
        </button>
      </div>
    </div>
  );
}

export default EventCard;
