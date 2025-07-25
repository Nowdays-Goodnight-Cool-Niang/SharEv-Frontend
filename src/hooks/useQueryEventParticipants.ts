import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { IPaginatedEventProfiles } from '@/types/domain/event';
import { eventClient } from '@/apis/event/event.client';

export const useQueryParticipants = (
  eventId: string
): UseInfiniteQueryResult<InfiniteData<IPaginatedEventProfiles>, Error> => {
  return useInfiniteQuery<IPaginatedEventProfiles, Error>({
    queryKey: ['participants', eventId],
    queryFn: async ({ pageParam = 0 }) => {
      const result = await eventClient.getParticipantsSafe(eventId, {
        page: pageParam as number,
      });
      if (!result) throw new Error('참여자 목록을 불러오지 못했습니다');
      return result;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { page } = lastPage;
      const isLastPage = page.number + 1 >= page.totalPages;
      return isLastPage ? undefined : page.number + 1;
    },
  });
};
