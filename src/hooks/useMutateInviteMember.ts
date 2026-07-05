import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';
import type { InviteMemberRequest } from '@/types/domain/team';

export const useMutateInviteMember = (teamId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InviteMemberRequest) => teamAPI.inviteMember(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMembers', teamId] });
    },
  });
};
