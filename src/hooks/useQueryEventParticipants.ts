import { useInfiniteQuery } from '@tanstack/react-query';
import { participantAPI } from '@/apis/participants';

const PAGE_SIZE = 20;

export const useInfiniteParticipants = () => {
  return useInfiniteQuery({
    queryKey: ['participants'],
    queryFn: ({ pageParam = 0 }) => participantAPI.getParticipants(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const totalSize = lastPage.totalSize;
      const loaded = pages.flatMap((p) => p.accountInfoPage.content).length;

      return loaded < totalSize ? pages.length : undefined;
    },
  });
};
