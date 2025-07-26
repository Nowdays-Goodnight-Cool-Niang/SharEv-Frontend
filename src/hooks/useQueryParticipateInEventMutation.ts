import { eventClient } from '@/apis/event/event.client';
import { useMutation } from '@tanstack/react-query';

export const useQueryParticipateInEvent = () => {
  return useMutation({
    mutationFn: eventClient.participateInEventSafe,
  });
};
