import { useQuery } from '@tanstack/react-query';
import { teamAPI } from '@/apis/teams';

export function useTeamDetail(teamId: string) {
  const { data: teamDetail, isLoading, error } = useQuery({
    queryKey: ['teamDetail', teamId],
    queryFn: () => teamAPI.getTeamDetail(teamId),
    enabled: !!teamId,
  });

  return { teamDetail: teamDetail ?? null, isLoading, error: error as Error | null };
}
