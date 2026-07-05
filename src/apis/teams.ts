import axios from 'axios';
import type {
  Team,
  TeamDetail,
  CreateTeamRequest,
  CreateTeamResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
  Member,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
  MemberRoleType,
} from '@/types/domain/team';

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

  createTeam: async (data: CreateTeamRequest): Promise<CreateTeamResponse> => {
    const response = await teamInstance.post<CreateTeamResponse>('', data);
    return response.data;
  },

  updateTeam: async (teamId: string, data: UpdateTeamRequest): Promise<UpdateTeamResponse> => {
    const response = await teamInstance.patch<UpdateTeamResponse>(`/${teamId}`, data);
    return response.data;
  },

  getMembers: async (teamId: string): Promise<Member[]> => {
    const response = await teamInstance.get<Member[]>(`/${teamId}/members`);
    return response.data;
  },

  inviteMember: async (
    teamId: string,
    data: InviteMemberRequest,
  ): Promise<{ memberId: number; role: MemberRoleType; status: string }> => {
    const response = await teamInstance.post(`/${teamId}/members`, data);
    return response.data;
  },

  removeMember: async (teamId: string, memberId: number): Promise<void> => {
    await teamInstance.delete(`/${teamId}/members/${memberId}`);
  },

  updateMemberRole: async (
    teamId: string,
    memberId: number,
    data: UpdateMemberRoleRequest,
  ): Promise<{ memberId: number; role: MemberRoleType }> => {
    const response = await teamInstance.patch(`/${teamId}/members/${memberId}/role`, data);
    return response.data;
  },
};
