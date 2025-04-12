import axios from 'axios';

export const participantInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/participants`,
  withCredentials: true,
});

export const participantAPI = {
  getParticipants: async (page: number, size: number) => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    const response = await participantInstance.get('', {
      params: { page, size, snapshotTime: today.toISOString() },
    });
    return response.data;
  },
  postParticipant: async (id: string) => {
    const response = await participantInstance.post('', { targetAccountId: id });
    return response.data;
  },
};
