import axios from 'axios';

export const participantInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/participants`,
  withCredentials: true,
});

export const participantAPI = {
  getParticipants: async (page: number, size: number) => {
    const response = await participantInstance.get('', {
      params: { page, size, snapshotTime: new Date().toISOString() },
    });
    return response.data;
  },
};
