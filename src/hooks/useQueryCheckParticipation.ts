import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { useQuery } from '@tanstack/react-query';

export function useQueryCheckParticipation(gatheringId: string) {
  return useQuery({
    queryKey: ['participation', gatheringId],
    queryFn: () => gatheringAPI.checkParticipation(gatheringId),
    enabled: !!gatheringId,
    staleTime: 1000 * 60 * 5,
  });
}
