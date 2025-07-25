import { eventClient } from '@/apis/event/event.client';
import { IEventProfile } from '@/types/common/ui';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseQueryEventProfile = (eventId: string) => {
  const { data, error } = useSuspenseQuery<IEventProfile | null>({
    queryKey: ['eventProfile', eventId, 'mine'],
    queryFn: () => eventClient.getMyProfileSafe(eventId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
  };
};
