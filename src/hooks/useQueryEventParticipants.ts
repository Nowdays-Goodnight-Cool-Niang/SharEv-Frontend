// import { useInfiniteQuery, UseInfiniteQueryResult, InfiniteData } from '@tanstack/react-query';
// import { participantAPI } from '@/apis/participants';
// import { ParticipantsResponse } from '@/types/api.types';

// export const useQueryParticipants = (): UseInfiniteQueryResult<
//   InfiniteData<ParticipantsResponse>,
//   Error
// > => {
//   return useInfiniteQuery<ParticipantsResponse, Error>({
//     queryKey: ['participants'],
//     queryFn: ({ pageParam = 0 }) => participantAPI.getParticipants({ page: pageParam as number }),
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => (lastPage.isLast ? undefined : lastPage.currentPage + 1),
//   });
// };
