import { useQuery } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';

export const useQueryTeamMembers = (teamId: string) => {
  return useQuery({
    queryKey: ['teamMembers', teamId],
    queryFn: () => teamAPI.getMembers(teamId),
    enabled: !!teamId,
  });
};
