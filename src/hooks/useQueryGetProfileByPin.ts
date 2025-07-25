import { useMutation } from '@tanstack/react-query';
import { eventAPI } from '@/apis/event/event.api';
import { mapEventProfileResponse } from '@/apis/event/event.mapper';
import { IEventProfile } from '@/types/common/ui';

export function useMutateGetProfileByPin(eventId: string) {
  return useMutation<IEventProfile, Error, string>({
    mutationFn: async (pinNumber: string) => {
      const res = await eventAPI.getProfileByPin(eventId, pinNumber);
      return mapEventProfileResponse(res);
    },
  });
}
