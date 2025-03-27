import { useQuery } from '@tanstack/react-query';
import { participantAPI } from '../apis/participants';
import { IProfile } from '../types';

export const useQueryParticipants = (page: number, size: number) => {
  const {
    data: participants,
    isLoading,
    error,
  } = useQuery<IProfile[]>({
    queryKey: ['participants'],
    queryFn: () => participantAPI.getParticipants(page, size),
  });

  return {
    participants,
    isLoading,
    error,
  };
};
