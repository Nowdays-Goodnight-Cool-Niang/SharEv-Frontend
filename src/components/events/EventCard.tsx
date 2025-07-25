import { EVENT_ID } from '@/constants/eventId';
import { useQueryParticipateInEvent } from '@/hooks/useQueryParticipateInEventMutation';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import ClockSvg from '@/assets/icons/ic_clock.svg?react';
import LocationSvg from '@/assets/icons/ic_location.svg?react';
import ToolTip from '@/components/common/ToolTip';
import { IEvent } from '@/types/common/ui';
import { formatKoreanDate } from '@/utils/format';
import {
  getEventStatus,
  getParticipationButtonStyle,
  getParticipationText,
  getStatusColor,
  getStatusText,
  isButtonDisabled,
} from '@/utils/eventStatus';
import { useQueryClient } from '@tanstack/react-query';

interface EventCardProps {
  event: IEvent;
  isParticipating: boolean;
}

function EventCard({ event, isParticipating }: EventCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useQueryParticipateInEvent();

  const eventStatus = getEventStatus(event.startDate, event.endDate);

  return (
    <div className="rounded-3xl bg-white px-4 py-5 dark:bg-gray-800">
      <ul className="mb-4 flex gap-1.5">
        <div
          className={`flex h-8 w-fit flex-col items-center justify-center rounded-lg px-3 text-sm font-medium ${getStatusColor(
            eventStatus
          )}`}
        >
          {getStatusText(eventStatus)}
        </div>
        <div
          className={`flex h-8 w-fit flex-col items-center justify-center rounded-lg ${isParticipating ? 'bg-blue-50 text-blue-500 dark:bg-blue-400/10 dark:text-blue-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'} px-3 text-sm font-medium`}
        >
          {isParticipating ? '참여' : '미참여'}
        </div>
      </ul>

      <div>
        <div className="mb-4">
          <h3 className="line-clamp-2 text-lg font-medium leading-7 tracking-tight text-gray-900 dark:text-white">
            {event.eventName}
          </h3>
          <p className="line-clamp-1 text-sm leading-6 tracking-tight text-gray-500 dark:text-gray-400">
            {event.organizer}
          </p>
        </div>

        <div className="mb-6 space-y-2.5 rounded-xl bg-gray-50 px-5 py-4 dark:bg-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <ClockSvg className="shrink-0" width={16} height={16} />
            <div className="line-clamp-1">{`${formatKoreanDate(event.startDate)} ~ ${formatKoreanDate(event.endDate)}`}</div>
          </div>
          <hr className="border-gray-100 dark:border-gray-600" />
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <LocationSvg className="shrink-0" width={16} height={16} />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={
              !isParticipating
                ? () => {
                    mutate(EVENT_ID, {
                      onSuccess: () => {
                        toast.success('행사에 참여하였습니다!');
                        queryClient.invalidateQueries({ queryKey: ['participation', EVENT_ID] });
                        navigate('/event');
                      },
                      onError: () => {
                        toast.error('문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.');
                      },
                    });
                  }
                : () => {
                    navigate('/event');
                  }
            }
            disabled={isButtonDisabled(eventStatus)}
            className={`h-14 w-full rounded-2xl px-5 font-medium transition-colors ${getParticipationButtonStyle(
              eventStatus
            )}`}
          >
            {getParticipationText(eventStatus, isParticipating)}
          </button>

          {eventStatus === 'ongoing' && !isParticipating && (
            <div className="absolute -bottom-10 z-10 flex w-full justify-center">
              <ToolTip>네트워킹을 시작해 볼까요?</ToolTip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
