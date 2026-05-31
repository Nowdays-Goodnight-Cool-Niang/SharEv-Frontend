import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Team } from '@/types/domain/team';

const teamInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/teams`,
  withCredentials: true,
});

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await teamInstance.get<Team[]>('');
        setTeams(response.data);
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
