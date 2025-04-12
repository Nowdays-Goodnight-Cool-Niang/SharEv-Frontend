import { useQuery } from '@tanstack/react-query';
import { participantAPI } from '../apis/participants';

const PAGE_SIZE = 1000;

export const useParticipants = () => {
  return useQuery({
    queryKey: ['participants'],
    queryFn: () => participantAPI.getParticipants(0, PAGE_SIZE),
  });
};
