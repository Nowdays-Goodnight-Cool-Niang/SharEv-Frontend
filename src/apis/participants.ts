import axios from 'axios';
import { instance } from '.';
import { IEventProfile } from '../types';

export const participantInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/participants`,
  withCredentials: true,
});

export const participantAPI = {
  putParticipantInfo: async (eventProfile :IEventProfile) => {
    const response = await participantInstance.put('/info', eventProfile);
    return response.data;
  },

  getParticipantInfo: async (participantId: string) => {
    const response = await participantInstance.get(`/info/${participantId}`);
    return response.data;
  },
};
