import { gatheringClient } from '@/apis/gathering/gathering.client';
import { IMyEventProfile } from '@/types/domain/event';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useSuspenseQueryEventProfile = (gatheringId: string) => {
  const { data, error } = useSuspenseQuery<IMyEventProfile | null>({
    queryKey: ['eventProfile', gatheringId, 'MY'],
    queryFn: () => gatheringClient.getMyCardSafe(gatheringId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
  };
};

export const useQueryEventProfile = (gatheringId: string) => {
  const { data, isLoading, error } = useQuery<IMyEventProfile | null>({
    queryKey: ['eventProfile', gatheringId, 'MY'],
    queryFn: () => gatheringClient.getMyCardSafe(gatheringId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};
