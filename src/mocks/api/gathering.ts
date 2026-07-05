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
  {
    id: 'a3b2c1d0-e5f6-4a3b-8c7d-9e0f1a2b3c4d',
    visible: 'PUBLIC',
    title: 'FEConf 2025 - 프론트엔드 개발 컨퍼런스',
    content: '국내 최대 프론트엔드 컨퍼런스. React, Vue, Svelte 등 최신 트렌드 공유',
    startAt: '2025-10-25T09:00:00',
    endAt: '2025-10-25T18:00:00',
    place: '코엑스 그랜드볼룸',
    registerStartAt: '2025-09-01T00:00:00',
    registerEndAt: '2025-10-24T23:59:59',
  },
  {
    id: 'b4c3d2e1-f6a7-5b4c-9d8e-0f1a2b3c4d5e',
    visible: 'PUBLIC',
    title: 'AI x Design Sprint Meetup',
    content: 'AI 도구를 활용한 디자인 스프린트 실습 및 네트워킹',
    startAt: '2026-03-15T13:00:00',
    endAt: '2026-03-15T19:00:00',
    place: '위워크 삼성역점 이벤트홀',
    registerStartAt: '2026-02-15T00:00:00',
    registerEndAt: '2026-03-14T23:59:59',
  },
];

// 참여 행사 = 전체 행사 + 종료된 행사 (종료된 건 참여했지만 전체 목록에는 안 보일 수 있음)
const myParticipatedGatherings: IGathering[] = [
  ...mockGatherings,
  {
    id: 'c5d4e3f2-a8b9-6c5d-0e9f-1a2b3c4d5e6f',
    visible: 'PUBLIC',
    title: 'Junction Asia 2025 Hackathon',
    content: '48시간 해커톤! 아시아 최대 규모 해커톤에서 글로벌 팀과 협업하세요',
    startAt: '2025-08-15T18:00:00',
    endAt: '2025-08-17T18:00:00',
    place: '동대문 디자인 플라자(DDP)',
    registerStartAt: '2025-06-01T00:00:00',
    registerEndAt: '2025-08-14T23:59:59',
  },
  {
    id: 'd6e5f4a3-b9c0-7d6e-1f0a-2b3c4d5e6f7a',
    visible: 'PUBLIC',
    title: 'if(kakao)dev 2025',
    content: '카카오 개발자 컨퍼런스. 카카오 서비스의 기술과 개발 문화를 공유합니다',
    startAt: '2025-09-10T10:00:00',
    endAt: '2025-09-11T17:00:00',
    place: '잠실 롯데호텔 크리스탈볼룸',
    registerStartAt: '2025-08-01T00:00:00',
    registerEndAt: '2025-09-09T23:59:59',
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
    mockLogger.response('GET', '/gatherings/me', 200, myParticipatedGatherings);
    return HttpResponse.json(myParticipatedGatherings);
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

  // 자기소개 템플릿 조회
  http.get(`${baseUrl}/gatherings/:gatheringId/template`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('GET', `/gatherings/${gatheringId}/template`);

    await delay(mockConfig.delays.fast);

    const templateResponse = {
      version: 1,
      text: '저의 자기소개입니다: ${introduce}\n가장 뿌듯했던 경험은 ${proudestExperience}\n가장 힘들었던 경험은 ${toughExperience}',
      fieldPlaceholders: {
        introduce: '자기소개를 입력하세요',
        proudestExperience: '가장 뿌듯했던 경험을 입력하세요',
        toughExperience: '가장 힘들었던 경험을 입력하세요',
      },
    };

    mockLogger.response('GET', `/gatherings/${gatheringId}/template`, 200, templateResponse);
    return HttpResponse.json(templateResponse);
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
  http.get(`${baseUrl}/gatherings/:gatheringId/cards/by-pin/:pinNumber`, async ({ params }) => {
    const { gatheringId, pinNumber } = params;
    mockLogger.request('GET', `/gatherings/${gatheringId}/cards/by-pin/${pinNumber}`);

    await delay(mockConfig.delays.normal);

    const response = getScenarioResponse(cardByPinData);
    mockLogger.response('GET', `/gatherings/${gatheringId}/cards/by-pin/${pinNumber}`, 200);

    return response;
  }),

  // 카드 생성 (행사 참여)
  http.post(`${baseUrl}/gatherings/:gatheringId/cards`, async ({ params }) => {
    const { gatheringId } = params;
    mockLogger.request('POST', `/gatherings/${gatheringId}/cards`);

    await delay(mockConfig.delays.fast);

    mockLogger.response('POST', `/gatherings/${gatheringId}/cards`, 201);

    return new HttpResponse(null, { status: 201 });
  }),

  // 행사 수정
  http.patch(`${baseUrl}/gatherings/:gatheringId`, async ({ request, params }) => {
    const { gatheringId } = params;
    const body = await request.json();
    mockLogger.request('PATCH', `/gatherings/${gatheringId}`, body);

    await delay(mockConfig.delays.normal);

    // mock 데이터 업데이트
    const idx = mockGatherings.findIndex((g) => g.id === gatheringId);
    if (idx !== -1) {
      mockGatherings[idx] = { ...mockGatherings[idx], ...(body as Partial<IGathering>) };
    }

    mockLogger.response('PATCH', `/gatherings/${gatheringId}`, 200, body);
    return HttpResponse.json(body);
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
