import { useQuery } from '@tanstack/react-query';
import { eventAPI } from '../apis/events';
import { IEventParticipant } from '../types';

export const useQueryEventParticipants = (eventId: string) => {
  const {
    data: eventParticipants,
    isLoading,
    error,
  } = useQuery<IEventParticipant[]>({
    queryKey: ['eventParticipants', eventId],
    queryFn: () => eventAPI.getEventParticipants(eventId),
  });

  return {
    eventParticipants,
    isLoading,
    error,
  };
};
