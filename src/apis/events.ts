import axios from 'axios';
import { instance } from '.';

export const eventInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/events`,
});

export const eventAPI = {
  getEvents: async () => {
    const response = await eventInstance.get('');
    return response.data;
  },

  getEventParticipants: async (eventId: number) => {
    const response = await eventInstance.get(`/${eventId}/participants`);
    return response.data;
  },
};
