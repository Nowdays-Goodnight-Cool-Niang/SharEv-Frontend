import { useMutation } from '@tanstack/react-query';
import { IFullEventProfile } from '@/types/domain/event';
import { eventClient } from '@/apis/event/event.client';

export function useMutateGetProfileByPin(eventId: string) {
  return useMutation<IFullEventProfile, Error, string>({
    mutationFn: async (pinNumber: string) => {
      const result = await eventClient.getProfileByPinSafe(eventId, pinNumber);
      if (!result) {
        throw new Error('프로필 정보를 불러오지 못했습니다.');
      }
      return result;
    },
  });
}
