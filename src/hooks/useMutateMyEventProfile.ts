import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EVENT_ID } from '@/constants/eventId';
import { gatheringAPI } from '@/apis/gathering/gathering.api';
import { CardUpdateRequest } from '@/types/api/event';

export const useMutateMyEventProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CardUpdateRequest) => gatheringAPI.updateMyCard(EVENT_ID, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventProfile', EVENT_ID, 'MY'] });
    },
  });
};
