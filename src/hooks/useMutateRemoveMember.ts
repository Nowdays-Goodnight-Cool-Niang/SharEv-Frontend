import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';

export const useMutateRemoveMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => teamAPI.removeMember(teamId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers', teamId] });
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
    },
  });
};
