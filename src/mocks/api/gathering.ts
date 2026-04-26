import { http, HttpResponse, delay } from 'msw';
import { myCardData, participationCheckData, cardByPinData } from './data/gatheringData';
import { createMockCards } from './data/factories';
import { PaginatedCardsResponse } from '@/types/api/event';
import { mockConfig, randomDelay } from '../config';
import { mockLogger } from '../utils/logger';
import { getScenarioResponse } from '../utils/scenarios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const gatheringHandler = [
  // 내 카드 조회
  http.get(`${baseUrl}/gathering/:gatheringId/cards/me`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('GET', `/gathering/${gatheringId}/cards/me`);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(myCardData);
    mockLogger.response('GET', `/gathering/${gatheringId}/cards/me`, 200, myCardData);

    return response;
  }),

  // 참여 여부 조회
  http.get(`${baseUrl}/gathering/:gatheringId`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('GET', `/gathering/${gatheringId}`);

    await delay(mockConfig.delays.fast);

    const response = getScenarioResponse(participationCheckData);
    mockLogger.response('GET', `/gathering/${gatheringId}`, 200);

    return response;
  }),

  // 카드 목록 조회 (페이지네이션)
  http.get(`${baseUrl}/gathering/:gatheringId/cards`, async ({ request, params }) => {
    const { gatheringId } = params;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');

    mockLogger.request('GET', `/gathering/${gatheringId}/cards?page=${page}&size=${size}`);

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

    mockLogger.response('GET', `/gathering/${gatheringId}/cards`, 200, {
      page,
      size,
      totalElements,
    });

    return HttpResponse.json(response);
  }),

  // PIN으로 카드 조회
  http.get(
    `${baseUrl}/gathering/:gatheringId/cards/by-pin/:pinNumber`,
    async ({ params }) => {
      const { gatheringId, pinNumber } = params;
      mockLogger.request('GET', `/gathering/${gatheringId}/cards/by-pin/${pinNumber}`);

      await delay(mockConfig.delays.normal);

      const response = getScenarioResponse(cardByPinData);
      mockLogger.response('GET', `/gathering/${gatheringId}/cards/by-pin/${pinNumber}`, 200);

      return response;
    }
  ),

  // 카드 생성 (행사 참여)
  http.post(`${baseUrl}/gathering/:gatheringId/cards`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('POST', `/gathering/${gatheringId}/cards`);

    await delay(mockConfig.delays.fast);

    mockLogger.response('POST', `/gathering/${gatheringId}/cards`, 201);

    return new HttpResponse(null, { status: 201 });
  }),

  // 카드 수정
  http.patch(`${baseUrl}/gathering/:gatheringId/cards`, async ({ request, params }) => {
    const { gatheringId } = params;
    const body = await request.json();
    mockLogger.request('PATCH', `/gathering/${gatheringId}/cards`, body);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(body);
    mockLogger.response('PATCH', `/gathering/${gatheringId}/cards`, 200, body);

    return response;
  }),
];
