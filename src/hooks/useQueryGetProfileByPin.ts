import { useMutation } from '@tanstack/react-query';
import { IFullEventProfile } from '@/types/domain/event';
import { gatheringClient } from '@/apis/gathering/gathering.client';

export function useMutateGetProfileByPin(gatheringId: string) {
  return useMutation<IFullEventProfile, Error, string>({
    mutationFn: async (pinNumber: string) => {
      const result = await gatheringClient.getCardByPinSafe(gatheringId, pinNumber);
      if (!result) {
        throw new Error('카드 정보를 불러오지 못했습니다.');
      }
      return result;
    },
  });
}
