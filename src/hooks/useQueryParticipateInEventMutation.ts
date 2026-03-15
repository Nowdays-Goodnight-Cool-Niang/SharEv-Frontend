import { gatheringClient } from '@/apis/gathering/gathering.client';
import { useMutation } from '@tanstack/react-query';

export const useQueryParticipateInEvent = () => {
  return useMutation({
    mutationFn: gatheringClient.participateInGatheringSafe,
  });
};
