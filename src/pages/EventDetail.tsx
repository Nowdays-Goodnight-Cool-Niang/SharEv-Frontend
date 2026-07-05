import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/common/Header';
import BottomSpace from '@/components/common/BottomSpace';
import ClockSvg from '@/assets/icons/ic_clock.svg?react';
import LocationSvg from '@/assets/icons/ic_location.svg?react';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { IGathering } from '@/types/domain/event';
import { formatKoreanDate } from '@/utils/format';
import {
  getEventStatus,
  getParticipationButtonStyle,
  getParticipationText,
  getStatusColor,
  getStatusText,
  isButtonDisabled,
} from '@/utils/eventStatus';
import { useQueryParticipateInEvent } from '@/hooks/useQueryParticipateInEventMutation';
import { useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '@/constants/routes';
import { showCustomToast } from '@/utils/showToast';
import useScrollToTop from '@/hooks/useScrollToTop';

function EventDetail() {
  useScrollToTop();
  const { gatheringId } = useParams<{ gatheringId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useQueryParticipateInEvent();

  const { data: gatherings } = useQuery<IGathering[]>({
    queryKey: ['gatherings'],
    queryFn: gatheringAPI.getGatherings,
    staleTime: 1000 * 60 * 5,
  });

  const { data: myGatherings } = useQuery<IGathering[]>({
    queryKey: ['gatherings', 'me'],
    queryFn: gatheringAPI.getMyGatherings,
    staleTime: 1000 * 60 * 5,
  });

  const gathering =
    gatherings?.find((g) => g.id === gatheringId) ??
    myGatherings?.find((g) => g.id === gatheringId);
  const isParticipating = myGatherings?.some((g) => g.id === gatheringId) ?? false;

  if (!gathering) {
    return (
      <div className="background flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
        <Header title="행사 상세" showBackButton />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-64 w-full animate-pulse px-6">
            <div className="mb-4 h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mb-2 h-7 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="mb-6 h-5 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="h-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  const startDate = new Date(gathering.startAt);
  const endDate = new Date(gathering.endAt);
  const eventStatus = getEventStatus(startDate, endDate);

  const handleEnterEvent = () => {
    if (isParticipating) {
      navigate(ROUTES.EVENT.WITH_ID(gathering.id));
      return;
    }

    if (eventStatus === 'ongoing') {
      mutate(gathering.id, {
        onSuccess: () => {
          showCustomToast({ message: '행사에 참여하였습니다!' });
          queryClient.invalidateQueries({ queryKey: ['gatherings', 'me'] });
          navigate(ROUTES.EVENT.WITH_ID(gathering.id));
        },
        onError: () => {
          showCustomToast({ message: '문제가 발생했습니다. 잠시 후에 다시 시도해 주세요.' });
        },
      });
    } else if (eventStatus === 'ended') {
      showCustomToast({ message: '종료된 행사에요.' });
    }
  };

  return (
    <div className="background scroll-hide relative flex min-h-full flex-col bg-gray-50 dark:bg-gray-950">
      <Header title="행사 상세" showBackButton />

      <div className="wrapper flex-1 py-4">
        {/* 상태 뱃지 */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${getStatusColor(eventStatus)}`}
          >
            {getStatusText(eventStatus)}
          </span>
        </div>

        {/* 제목 + 설명 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white">
            {gathering.title}
          </h2>
          <p className="mt-2 text-sm leading-6 tracking-tight text-gray-500 dark:text-gray-400">
            {gathering.content}
          </p>
        </div>

        {/* 정보 박스 */}
        <div className="mb-4 space-y-2.5 rounded-2xl bg-white px-5 py-5 dark:bg-gray-800">
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <ClockSvg className="shrink-0 text-gray-400" width={18} height={18} />
            <div>{`${formatKoreanDate(startDate)} ~ ${formatKoreanDate(endDate)}`}</div>
          </div>
          <hr className="border-gray-100 dark:border-gray-700" />
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <LocationSvg className="shrink-0 text-gray-400" width={18} height={18} />
            <span>{gathering.place}</span>
          </div>
          {gathering.gatheringUrl && (
            <>
              <hr className="border-gray-100 dark:border-gray-700" />
              <div className="flex items-center gap-3 text-sm">
                <svg
                  className="shrink-0 text-gray-400"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <a
                  href={gathering.gatheringUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-blue-500 hover:underline"
                >
                  {gathering.gatheringUrl}
                </a>
              </div>
            </>
          )}
          {gathering.contact && (
            <>
              <hr className="border-gray-100 dark:border-gray-700" />
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <svg
                  className="shrink-0 text-gray-400"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{gathering.contact}</span>
              </div>
            </>
          )}
        </div>

        {/* 등록 기간 */}
        <div className="mb-6 rounded-2xl bg-white px-5 py-4 dark:bg-gray-800">
          <p className="mb-1 text-xs font-medium text-gray-400 dark:text-gray-500">참가 신청 기간</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {formatKoreanDate(new Date(gathering.registerStartAt))} ~{' '}
            {formatKoreanDate(new Date(gathering.registerEndAt))}
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="wrapper sticky bottom-0 border-t border-gray-200 bg-gray-50 py-3 dark:border-gray-800 dark:bg-gray-950">
        <button
          onClick={handleEnterEvent}
          disabled={isButtonDisabled(eventStatus)}
          className={`h-14 w-full rounded-2xl px-5 font-medium transition-colors ${getParticipationButtonStyle(eventStatus)}`}
        >
          {getParticipationText(eventStatus, isParticipating)}
        </button>
      </div>
      <BottomSpace />
    </div>
  );
}

export default EventDetail;
