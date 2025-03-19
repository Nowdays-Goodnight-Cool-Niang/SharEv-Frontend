import { useQuery } from '@tanstack/react-query';
import { participantAPI } from '../apis/participants';
import { IParticipantInfo } from '../types';

export const useQueryParticipantInfo = (participantId: string) => {
  const {
    data: participantInfo,
    isLoading,
    error,
  } = useQuery<IParticipantInfo>({
    queryKey: ['eventParticipant', participantId],
    queryFn: () => participantAPI.getParticipantInfo(participantId),
  });

  return {
    participantInfo,
    isLoading,
    error,
  };
};
