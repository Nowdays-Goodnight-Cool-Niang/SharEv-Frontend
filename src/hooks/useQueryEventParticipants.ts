import { useQuery } from '@tanstack/react-query';
import { participantAPI } from '../apis/participants';
import { IProfile } from '../types';

export const useQueryParticipants = () => {
  const {
    data: participants,
    isLoading,
    error,
  } = useQuery<IProfile[]>({
    queryKey: ['participants'],
    queryFn: () => participantAPI.getParticipants(),
  });

  return {
    participants,
    isLoading,
    error,
  };
};
