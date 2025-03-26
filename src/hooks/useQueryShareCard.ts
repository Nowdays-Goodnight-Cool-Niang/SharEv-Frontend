import { useQuery } from '@tanstack/react-query';
import { shareCardAPI } from '../apis/shareCards';
import { IShareCard } from '../types';

export const useQueryShareCard = (participantId: string) => {
  const {
    data: participantInfo,
    isLoading,
    error,
  } = useQuery<IShareCard>({
    queryKey: ['shareCard', participantId],
    queryFn: () => shareCardAPI.getShareCardById(participantId),
  });

  return {
    participantInfo,
    isLoading,
    error,
  };
};
