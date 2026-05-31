import { useState, useEffect } from 'react';
import { teamAPI } from '@/apis/teams';
import type { TeamDetail } from '@/types/domain/team';

export function useTeamDetail(teamId: string) {
  const [teamDetail, setTeamDetail] = useState<TeamDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        setIsLoading(true);
        setTeamDetail(await teamAPI.getTeamDetail(teamId));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('팀 상세 정보를 불러오는데 실패했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamDetail();
  }, [teamId]);

  return { teamDetail, isLoading, error };
}
