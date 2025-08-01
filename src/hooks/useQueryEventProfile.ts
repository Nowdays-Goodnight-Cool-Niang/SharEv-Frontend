import { eventClient } from '@/apis/event/event.client';
import { IMyEventProfile } from '@/types/domain/event';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseQueryEventProfile = (eventId: string) => {
  const { data, error } = useSuspenseQuery<IMyEventProfile | null>({
    queryKey: ['eventProfile', eventId, 'MY'],
    queryFn: () => eventClient.getMyProfileSafe(eventId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
  };
};

export const useQueryEventProfile = (eventId: string) => {
  const { data, isLoading, error } = useQuery<IMyEventProfile | null>({
    queryKey: ['eventProfile', eventId, 'MY'],
    queryFn: () => eventClient.getMyProfileSafe(eventId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};
