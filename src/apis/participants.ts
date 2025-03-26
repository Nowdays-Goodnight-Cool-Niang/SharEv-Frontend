import axios from 'axios';

export const participantInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/social-dex`,
  withCredentials: true,
});

export const participantAPI = {
  getParticipants: async () => {
    const response = await participantInstance.get('');
    return response.data;
  },
};
