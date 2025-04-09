import { useQuery } from '@tanstack/react-query';
import { shareCardAPI } from '../apis/shareCards';
import { IShareCardDetailsByEvent } from '../types';

interface UseQueryShareCardOptions {
  enabled?: boolean;
}

export const useQueryShareCard = (participantId: string, options?: UseQueryShareCardOptions) => {
  const {
    data: participantInfo,
    isLoading,
    error,
  } = useQuery<IShareCardDetailsByEvent>({
    queryKey: ['shareCardDetail', participantId],
    queryFn: () => shareCardAPI.getShareCardById(participantId),
    enabled: options?.enabled ?? true,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });

  return {
    participantInfo,
    isLoading,
    error,
  };
};
