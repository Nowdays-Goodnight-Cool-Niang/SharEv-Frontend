import axios from 'axios';
import { instance } from '.';

export const participantInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/participants`,
  withCredentials: true,
});

export const participantAPI = {
  putParticipantInfo: async (eventId: number, jobGroup: string, teamName: string, projectInfo: string) => {
    const response = await participantInstance.put('/info', { eventId, jobGroup, teamName, projectInfo });
    return response.data;
  },

  getParticipantInfo: async (participantId: number) => {
    const response = await participantInstance.get(`/info/${participantId}`);
    return response.data;
  },
};
