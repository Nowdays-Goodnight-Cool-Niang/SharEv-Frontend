import axios from 'axios';
import { instance } from '.';
import { IFormAccount } from '../types/formAccount';

export const accountInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/accounts`,
  withCredentials: true,
});

export const accountAPI = {
  getAccount: async () => {
    const response = await accountInstance.get('');
    return response.data;
  },

  patchParticipantInfo: async (data:IFormAccount) => {
    const response = await accountInstance.patch('', data,{  withCredentials: true,});
    return response.data;
  },
};
