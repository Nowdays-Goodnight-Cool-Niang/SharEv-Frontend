import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { eventAPI } from '@/apis/event/event.api';
import { PaginatedEventProfilesResponse } from '@/types/api/event';

export const useQueryParticipants = (
  eventId: string
): UseInfiniteQueryResult<InfiniteData<PaginatedEventProfilesResponse>, Error> => {
  return useInfiniteQuery<PaginatedEventProfilesResponse, Error>({
    queryKey: ['participants', eventId],
    queryFn: ({ pageParam = 0 }) =>
      eventAPI.getParticipants(eventId, { page: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { page } = lastPage.relationProfiles;

      const isLastPage = page.number + 1 >= page.totalPages;
      return isLastPage ? undefined : page.number + 1;
    },
  });
};
