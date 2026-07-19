import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';
import type { UpdateMemberRoleRequest } from '@/types/domain/team';

export const useMutateUpdateMemberRole = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, data }: { memberId: number; data: UpdateMemberRoleRequest }) =>
      teamAPI.updateMemberRole(teamId, memberId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers', teamId] });
      queryClient.invalidateQueries({ queryKey: ['teamDetail', teamId] });
    },
  });
};
