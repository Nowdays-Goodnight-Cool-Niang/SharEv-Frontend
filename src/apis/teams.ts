import axios from 'axios';
import type { Team, TeamDetail } from '@/types/domain/team';

export const teamInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/teams`,
  withCredentials: true,
});

export const teamAPI = {
  getTeams: async (): Promise<Team[]> => {
    const response = await teamInstance.get<Team[]>('');
    return response.data;
  },

  getTeamDetail: async (teamId: string): Promise<TeamDetail> => {
    const response = await teamInstance.get<TeamDetail>(`/${teamId}`);
    return response.data;
  },
};
