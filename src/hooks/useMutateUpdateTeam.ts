import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';
import type { UpdateTeamRequest } from '@/types/domain/team';

export const useMutateUpdateTeam = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTeamRequest) => teamAPI.updateTeam(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};
