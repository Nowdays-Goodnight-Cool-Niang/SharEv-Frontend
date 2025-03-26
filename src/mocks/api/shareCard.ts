import { shareCardData } from './data/shareCardData';
import { http, HttpResponse } from 'msw';

export const shareCardHandler = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/share-cards/:participantId`, (req) => {
    const { participantId } = req.params;
    console.log('Intercepted share card request for:', participantId);
    return HttpResponse.json(shareCardData);
  }),
];
