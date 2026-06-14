import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
import { IPaginatedEventProfiles } from '@/types/domain/event';
import { gatheringClient } from '@/apis/gathering/gathering.client';
import { useRef } from 'react';

export const useQueryParticipants = (
  gatheringId: string
): UseInfiniteQueryResult<InfiniteData<IPaginatedEventProfiles>, Error> => {
  const snapshotTimeRef = useRef<string>('');

  return useInfiniteQuery<IPaginatedEventProfiles, Error>({
    queryKey: ['participants', gatheringId],
    queryFn: async ({ pageParam = 0 }) => {
      if (pageParam === 0 || !snapshotTimeRef.current) {
        snapshotTimeRef.current = new Date().toISOString();
      }

      const result = await gatheringClient.getCardsSafe(gatheringId, {
        page: pageParam as number,
        snapshotTime: snapshotTimeRef.current,
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
