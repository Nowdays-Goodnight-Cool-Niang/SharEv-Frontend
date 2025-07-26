import { eventAPI } from '@/apis/event/event.api';
import { useQuery } from '@tanstack/react-query';

export function useQueryCheckParticipation(eventId: string) {
  return useQuery({
    queryKey: ['participation', eventId],
    queryFn: () => eventAPI.checkParticipation(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 5,
  });
}
