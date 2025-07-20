import { ParticipantsResponse } from '@/types/api.types';
import axios from 'axios';

export const participantInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/participants`,
  withCredentials: true,
});

export const participantAPI = {
  getParticipants: async ({
    page,
    size = 10,
  }: {
    page: number;
    size?: number;
  }): Promise<ParticipantsResponse> => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    const response = await participantInstance.get('', {
      params: { page, size, snapshotTime: today.toISOString() },
    });

    return {
      registerCount: response.data.registerCount,
      participants: response.data.socialDexInfo.content,
      totalCount: response.data.socialDexInfo.totalElements,
      totalPages: response.data.socialDexInfo.totalPages,
      currentPage: response.data.socialDexInfo.number,
      isLast: response.data.socialDexInfo.last,
    } as ParticipantsResponse;
  },
  postParticipant: async (id: string) => {
    const response = await participantInstance.post('', { targetAccountId: id });
    return response.data;
  },
};
