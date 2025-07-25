import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { ParticipantsResponse } from '@/types/api.types';
import { eventAPI } from '@/apis/event/event.api';

export const useQueryParticipants = (
  eventId: string
): UseInfiniteQueryResult<InfiniteData<ParticipantsResponse>, Error> => {
  return useInfiniteQuery<ParticipantsResponse, Error>({
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
