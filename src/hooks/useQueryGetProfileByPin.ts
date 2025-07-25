import { useMutation } from '@tanstack/react-query';
import { eventAPI } from '@/apis/event/event.api';
import { eventMapper } from '@/apis/event/event.mapper';
import { IPublicEventProfile } from '@/types/domain/event';

export function useMutateGetProfileByPin(eventId: string) {
  return useMutation<IPublicEventProfile, Error, string>({
    mutationFn: async (pinNumber: string) => {
      const res = await eventAPI.getProfileByPin(eventId, pinNumber);
      return eventMapper.mapPublicEventProfile(res);
    },
  });
}
