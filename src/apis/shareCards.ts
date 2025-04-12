import axios from 'axios';
import { IShareCard } from '@/types';

export const shareCardInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/share-cards`,
  withCredentials: true,
});

export const shareCardAPI = {
  getShareCardById: async (participantId: string) => {
    const response = await shareCardInstance.get(`/${participantId}`);
    return response.data;
  },

  patchShareCard: async (shareCard: IShareCard) => {
    const response = await shareCardInstance.patch('', shareCard);
    return response.data;
  },
};
