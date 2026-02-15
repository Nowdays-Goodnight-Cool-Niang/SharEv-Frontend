import { http, HttpResponse, delay } from 'msw';
import { eventProfileData, participationCheckData, profileByPinData } from './data/eventData';
import { createMockParticipants } from './data/factories';
import { PaginatedEventProfilesResponse } from '@/types/api/event';
import { IMyEventProfile } from '@/types/domain/event';
import { mockConfig, randomDelay } from '../config';
import { mockLogger } from '../utils/logger';
import { getScenarioResponse } from '../utils/scenarios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const eventHandler = [
  // 본인 프로필 조회
  http.get(`${baseUrl}/events/:eventId/profiles`, async ({ params }) => {
    const { eventId } = params;
    mockLogger.request('GET', `/events/${eventId}/profiles`);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(eventProfileData);
    mockLogger.response('GET', `/events/${eventId}/profiles`, 200, eventProfileData);

    return response;
  }),

  // 참여 여부 조회
  http.get(`${baseUrl}/events/:eventId`, async ({ params }) => {
    const { eventId } = params;
    mockLogger.request('GET', `/events/${eventId}`);

    await delay(mockConfig.delays.fast);

    const response = getScenarioResponse(participationCheckData);
    mockLogger.response('GET', `/events/${eventId}`, 200);

    return response;
  }),

  // 참여자 목록 조회 (페이지네이션)
  http.get(`${baseUrl}/events/:eventId/participants`, async ({ request, params }) => {
    const { eventId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '10');

    mockLogger.request('GET', `/events/${eventId}/participants?page=${page}&size=${size}`);

    // 동적으로 100개의 참여자 생성
    const allParticipants = createMockParticipants(100);

    const start = page * size;
    const end = start + size;
    const content = allParticipants.slice(start, end);
    const totalElements = allParticipants.length;
    const totalPages = Math.ceil(totalElements / size);

    const response: PaginatedEventProfilesResponse = {
      registerCount: allParticipants.filter((p) => p.relationFlag).length,
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

    // 네트워크 지연 시뮬레이션 (랜덤)
    await delay(randomDelay(300, 1000));

    mockLogger.response('GET', `/events/${eventId}/participants`, 200, {
      page,
      size,
      totalElements,
    });

    return HttpResponse.json(response);
  }),

  // PIN으로 프로필 조회
  http.get(`${baseUrl}/events/:eventId/profiles/:pinNumber`, async ({ params }) => {
    const { eventId, pinNumber } = params;
    mockLogger.request('GET', `/events/${eventId}/profiles/${pinNumber}`);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(profileByPinData);
    mockLogger.response('GET', `/events/${eventId}/profiles/${pinNumber}`, 200);

    return response;
  }),

  // 도감 등록 (POST)
  http.post(`${baseUrl}/events/:eventId/participants`, async ({ params }) => {
    const { eventId } = params;
    mockLogger.request('POST', `/events/${eventId}/participants`);

    await delay(mockConfig.delays.fast);

    const response = getScenarioResponse({ success: true });
    mockLogger.response('POST', `/events/${eventId}/participants`, 200);

    return response;
  }),

  // 참여 (POST)
  http.post(`${baseUrl}/events/:eventId/profiles`, async ({ params, request }) => {
    const { eventId } = params;
    const body = await request.json();
    mockLogger.request('POST', `/events/${eventId}/profiles`, body);

    await delay(mockConfig.delays.fast);

    const newProfile = { ...eventProfileData, profileId: Date.now() };
    const response = getScenarioResponse(newProfile);
    mockLogger.response('POST', `/events/${eventId}/profiles`, 201, newProfile);

    return response;
  }),

  // 프로필 수정 (PATCH)
  http.patch(`${baseUrl}/events/:eventId/profiles`, async ({ request, params }) => {
    const { eventId } = params;
    const body = (await request.json()) as Partial<IMyEventProfile>;
    mockLogger.request('PATCH', `/events/${eventId}/profiles`, body);

    await delay(mockConfig.delays.normal);

    const updatedProfile = { ...eventProfileData, ...body };
    const response = getScenarioResponse(updatedProfile);
    mockLogger.response('PATCH', `/events/${eventId}/profiles`, 200, updatedProfile);

    return response;
  }),
];
