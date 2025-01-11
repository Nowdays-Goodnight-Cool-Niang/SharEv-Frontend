import axios from "axios";
import { instance } from ".";

export const eventInstance = axios.create({
  baseURL: `${instance.defaults.baseURL}/events`,
  withCredentials: true,
});

export const eventAPI = {
  getEvents: async () => {
    const response = await eventInstance.get("");
    console.log(response);
    return response.data;
  },

  getEventById: async (eventId: string) => {
    const response = await eventInstance.get(`/${eventId}`);
    return response.data;
  },

  getEventParticipants: async (eventId: number) => {
    const response = await eventInstance.get(`/${eventId}/participants`);
    return response.data;
  },
};
