import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { CardUpdateRequest } from '@/types/api/event';

export const useMutateMyEventProfile = (gatheringId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CardUpdateRequest) => gatheringAPI.updateMyCard(gatheringId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventProfile', gatheringId, 'MY'] });
    },
  });
};
