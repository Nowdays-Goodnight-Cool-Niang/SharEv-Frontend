import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';
import type { CreateTeamRequest } from '@/types/domain/team';

export const useMutateCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamRequest) => teamAPI.createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
};
