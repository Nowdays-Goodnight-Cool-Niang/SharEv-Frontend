import { eventAPI } from '@/apis/event/event.api';
import { useMutation } from '@tanstack/react-query';

export function useQueryRegisterParticipant(eventId: string) {
  return useMutation({
    mutationFn: (pin: string) => eventAPI.registerParticipant(eventId, pin),
  });
}
