import { eventProfileData } from './data/eventProfileData';
import { delay, http, HttpResponse } from 'msw';

export const eventHandler = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/events/:eventId/profiles`, async ({ params }) => {
    const { eventId } = params;
    await delay(3000);
    console.log('Mock getMyProfile for eventId:', eventId);
    return HttpResponse.json(eventProfileData);
  }),
];
