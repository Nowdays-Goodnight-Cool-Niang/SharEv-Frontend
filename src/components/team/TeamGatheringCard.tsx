import type { TeamGathering } from '@/types/domain/team';
import ClockSvg from '@/assets/icons/ic_clock.svg?react';
import LocationSvg from '@/assets/icons/ic_location.svg?react';
import { formatKoreanDate } from '@/utils/format';
import { getEventStatus } from '@/utils/eventStatus';

interface TeamGatheringCardProps {
  gathering: TeamGathering;
  onParticipate?: (gathering: TeamGathering) => void;
  onDelete?: (gathering: TeamGathering) => void;
}

function TeamGatheringCard({ gathering, onParticipate, onDelete }: TeamGatheringCardProps) {
  const startDate = new Date(gathering.startAt);
  const endDate = new Date(gathering.endAt);
  const status = getEventStatus(startDate, endDate);
  const isEnded = status === 'ended';

  const formatDateRange = () => {
    const start = formatKoreanDate(startDate);
    const end = formatKoreanDate(endDate);
    return `${start} ~ ${end}`;
  };

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <div className="mb-1 flex items-start justify-between">
        <h4 className="pr-2 text-base font-bold text-gray-900">{gathering.title}</h4>
        {onDelete && (
          <button
            onClick={() => onDelete(gathering)}
            className="shrink-0 p-1 text-gray-300 transition-colors hover:text-gray-500"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3,6 5,6 21,6" />
              <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
            </svg>
          </button>
        )}
      </div>

      <p className="mb-3 text-sm text-gray-400">{gathering.teamName}</p>

      <div className="mb-1 flex items-start gap-2 text-sm text-gray-500">
        <ClockSvg width={16} height={16} className="mt-0.5 shrink-0 text-gray-400" />
        <span className="leading-5">{formatDateRange()}</span>
      </div>

      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <LocationSvg width={16} height={16} className="shrink-0 text-gray-400" />
        <span>{gathering.place}</span>
      </div>

      {isEnded ? (
        <button
          disabled
          className="w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-300"
        >
          종료됨
        </button>
      ) : (
        <button
          onClick={() => onParticipate?.(gathering)}
          className="w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-400 active:scale-[0.98]"
        >
          참여하기
        </button>
      )}
    </div>
  );
}

export default TeamGatheringCard;
