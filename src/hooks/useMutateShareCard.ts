import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shareCardAPI } from '@/apis/event';

export const useMutateShareCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: shareCardAPI.patchShareCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareCardDetail'] });
    },
  });
};
