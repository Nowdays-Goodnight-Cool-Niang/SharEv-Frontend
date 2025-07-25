import { http, HttpResponse, delay } from 'msw';
import {
  eventProfileData,
  participantsData,
  participationCheckData,
  profileByPinData,
} from './data/eventData';
import { ParticipantsResponse } from '@/types/api.types';

export const eventHandler = [
  // 본인 프로필 조회
  http.get(`${import.meta.env.VITE_API_BASE_URL}/events/:eventId/profiles`, async ({ params }) => {
    await delay(500);
    return HttpResponse.json(eventProfileData);
  }),

  // 참여 여부 조회
  http.get(`${import.meta.env.VITE_API_BASE_URL}/events/:eventId`, async ({ params }) => {
    await delay(300);
    return HttpResponse.json(participationCheckData);
  }),

  // 참여자 목록 조회
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/events/:eventId/participants`,
    async ({ request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get('page') || '0');
      const size = Number(url.searchParams.get('size') || '10');

      const start = page * size;
      const end = start + size;

      const content = participantsData.slice(start, end);
      const totalElements = participantsData.length;
      const totalPages = Math.ceil(totalElements / size);

      const response: ParticipantsResponse = {
        registerCount: participantsData.filter((card) => card.relationFlag).length,
        relationProfiles: {
          content,
          page: {
            size,
            number: page,
            totalElements,
            totalPages,
          },
        },
      };

      console.log('📦 Intercepted /participants request', response);

      await delay(3000);
      return HttpResponse.json(response);
    }
  ),

  // PIN으로 프로필 조회
  http.get(
    `${import.meta.env.VITE_API_BASE_URL}/events/:eventId/profiles/:pinNumber`,
    async ({ params }) => {
      await delay(400);
      return HttpResponse.json(profileByPinData);
    }
  ),

  // 도감 등록 (POST)
  http.post(
    `${import.meta.env.VITE_API_BASE_URL}/events/:eventId/participants`,
    async ({ request }) => {
      await delay(300);
      return HttpResponse.json({ success: true });
    }
  ),

  // 참여 (POST)
  http.post(`${import.meta.env.VITE_API_BASE_URL}/events/:eventId/profiles`, async ({ params }) => {
    await delay(300);
    return HttpResponse.json({ ...eventProfileData, profileId: 5 });
  }),

  // 프로필 수정 (PATCH)
  http.patch(
    `${import.meta.env.VITE_API_BASE_URL}/events/:eventId/profiles`,
    async ({ request }) => {
      const body = await request.json();
      return HttpResponse.json({ ...eventProfileData, ...body });
    }
  ),
];
