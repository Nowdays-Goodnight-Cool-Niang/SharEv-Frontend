import { http, HttpResponse, delay } from 'msw';
import { myCardData, participationCheckData, cardByPinData } from './data/gatheringData';
import { createMockCards } from './data/factories';
import { PaginatedCardsResponse } from '@/types/api/event';
import { IGathering } from '@/types/domain/event';
import { mockConfig, randomDelay } from '../config';
import { mockLogger } from '../utils/logger';
import { getScenarioResponse } from '../utils/scenarios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const mockGatherings: IGathering[] = [
  {
    id: 'd8f1e6c3-9a7b-4d4f-b6e1-5c8e3b7d2e0a',
    visible: 'PUBLIC',
    title: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
    content: 'GDG Campus Korea 주최 개발자 네트워킹 행사',
    startAt: '2025-08-02T10:00:00',
    endAt: '2026-08-02T18:00:00',
    place: '구글 스타트업 캠퍼스',
    registerStartAt: '2025-07-01T00:00:00',
    registerEndAt: '2025-08-01T23:59:59',
  },
];

export const gatheringHandler = [
  // 모든 행사 목록 조회
  http.get(`${baseUrl}/gatherings`, async ({ request }) => {
    const url = new URL(request.url);
    // /gatherings/:gatheringId 패턴과 구분 (pathSegments로 확인)
    if (url.pathname.split('/').filter(Boolean).length > 2) return;

    mockLogger.request('GET', '/gatherings');
    await delay(mockConfig.delays.fast);
    mockLogger.response('GET', '/gatherings', 200, mockGatherings);
    return HttpResponse.json(mockGatherings);
  }),

  // 내 참여 행사 목록 조회
  http.get(`${baseUrl}/gatherings/me`, async () => {
    mockLogger.request('GET', '/gatherings/me');
    await delay(mockConfig.delays.fast);
    mockLogger.response('GET', '/gatherings/me', 200, mockGatherings);
    return HttpResponse.json(mockGatherings);
  }),

  // 내 카드 조회
  http.get(`${baseUrl}/gatherings/:gatheringId/cards/me`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('GET', `/gatherings/${gatheringId}/cards/me`);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(myCardData);
    mockLogger.response('GET', `/gatherings/${gatheringId}/cards/me`, 200, myCardData);

    return response;
  }),

  // 참여 여부 조회
  http.get(`${baseUrl}/gatherings/:gatheringId`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('GET', `/gatherings/${gatheringId}`);

    await delay(mockConfig.delays.fast);

    const response = getScenarioResponse(participationCheckData);
    mockLogger.response('GET', `/gatherings/${gatheringId}`, 200);

    return response;
  }),

  // 카드 목록 조회 (페이지네이션)
  http.get(`${baseUrl}/gatherings/:gatheringId/cards`, async ({ request, params }) => {
    const { gatheringId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');

    mockLogger.request('GET', `/gatherings/${gatheringId}/cards?page=${page}&size=${size}`);

    const allCards = createMockCards(100);

    const start = page * size;
    const end = start + size;
    const content = allCards.slice(start, end);
    const totalElements = allCards.length;
    const totalPages = Math.ceil(totalElements / size);

    const response: PaginatedCardsResponse = {
      content,
      page: {
        size,
        number: page,
        totalElements,
        totalPages,
      },
    };

    await delay(randomDelay(300, 1000));

    mockLogger.response('GET', `/gatherings/${gatheringId}/cards`, 200, {
      page,
      size,
      totalElements,
    });

    return HttpResponse.json(response);
  }),

  // PIN으로 카드 조회
  http.get(
    `${baseUrl}/gatherings/:gatheringId/cards/by-pin/:pinNumber`,
    async ({ params }) => {
      const { gatheringId, pinNumber } = params;
      mockLogger.request('GET', `/gatherings/${gatheringId}/cards/by-pin/${pinNumber}`);

      await delay(mockConfig.delays.normal);

      const response = getScenarioResponse(cardByPinData);
      mockLogger.response('GET', `/gatherings/${gatheringId}/cards/by-pin/${pinNumber}`, 200);

      return response;
    }
  ),

  // 카드 생성 (행사 참여)
  http.post(`${baseUrl}/gatherings/:gatheringId/cards`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('POST', `/gatherings/${gatheringId}/cards`);

    await delay(mockConfig.delays.fast);

    mockLogger.response('POST', `/gatherings/${gatheringId}/cards`, 201);

    return new HttpResponse(null, { status: 201 });
  }),

  // 카드 수정
  http.patch(`${baseUrl}/gatherings/:gatheringId/cards`, async ({ request, params }) => {
    const { gatheringId } = params;
    const body = await request.json();
    mockLogger.request('PATCH', `/gatherings/${gatheringId}/cards`, body);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(body);
    mockLogger.response('PATCH', `/gatherings/${gatheringId}/cards`, 200, body);

    return response;
  }),
];
