import axios from 'axios';
import { IProfile } from '../types';

export const accountInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/accounts`,
  withCredentials: true,
});

export const accountAPI = {
  getProfile: async () => {
    const response = await accountInstance.get('');
    return response.data;
  },

  patchProfileInfo: async (data: Omit<IProfile, 'id'>) => {
    const response = await accountInstance.patch('', data, { withCredentials: true });
    return response.data;
  },

  deleteAccount: async () => {
    const response = await accountInstance.delete('');
    return response.data;
  },
};
