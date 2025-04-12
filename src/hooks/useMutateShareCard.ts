import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shareCardAPI } from '@/apis/shareCards';

export const useMutateShareCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: shareCardAPI.patchShareCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shareCardDetail'] });
    },
  });
};
