import { profileData } from './data/profileData';
import { http, HttpResponse } from 'msw';

export const profileHandler = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/accounts`, () => {
    console.log('Intercepted profile request');
    return HttpResponse.json(profileData);
  }),
];
