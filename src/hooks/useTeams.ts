import { useState, useEffect } from 'react';
import { teamAPI } from '@/apis/teams';
import type { Team } from '@/types/domain/team';

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        setTeams(await teamAPI.getTeams());
      } catch (err) {
        setError(err instanceof Error ? err : new Error('팀 목록을 불러오는데 실패했습니다.'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, isLoading, error };
}
