import { http, delay, HttpResponse } from 'msw';
import { mockConfig } from '../config';
import { mockLogger } from '../utils/logger';
import type { Team, TeamDetail } from '@/types/domain/team';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const mockTeams: Team[] = [
  {
    id: 1,
    title: 'GDC Campus Korea',
    content: '개발자 커뮤니티를 위한 다양한 행사를 기획하고 운영합니다.',
    createdAt: '2024-01-15T00:00:00',
    memberRoleType: 'ADMIN',
    headcount: 24,
  },
  {
    id: 2,
    title: 'Tech Valley Seoul',
    content: '서울의 스타트업과 개발자들을 위한 네트워킹 공간',
    createdAt: '2024-06-10T00:00:00',
    memberRoleType: 'COMMON',
    headcount: 18,
  },
  {
    id: 3,
    title: 'Startup Korea',
    content: '한국 스타트업 생태계를 만들어가는 사람들',
    createdAt: '2023-12-01T00:00:00',
    memberRoleType: 'COMMON',
    headcount: 42,
  },
];

const mockTeamDetails: Record<string, TeamDetail> = {
  '1': {
    id: 1,
    title: 'GDC Campus Korea',
    content: '개발자 커뮤니티를 위한 다양한 행사를 기획하고 운영합니다.',
    createdAt: '2024-01-15T00:00:00',
    headcount: 24,
    gatherings: [
      {
        title: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
        startAt: '2025-08-02T10:00:00',
        endAt: '2025-10-01T00:00:00',
        place: '구글 스타트업 캠퍼스',
      },
      {
        title: 'AI와 함께하는 스타트업 워크샵',
        startAt: '2025-09-15T14:00:00',
        endAt: '2025-09-15T18:00:00',
        place: '강남 D2 스타트업 팩토리',
      },
    ],
    members: [
      { name: '권나연', email: 'chichoc.dev@gmail.com' },
      { name: '김개발', email: 'dev@example.com' },
      { name: '이디자인', email: 'design@example.com' },
    ],
  },
};

export const teamHandler = [
  // 팀 목록 조회
  http.get(`${baseUrl}/teams`, async () => {
    mockLogger.request('GET', '/teams');

    await delay(mockConfig.delays.fast);

    mockLogger.response('GET', '/teams', 200, mockTeams);
    return HttpResponse.json(mockTeams);
  }),

  // 팀 상세 조회
  http.get(`${baseUrl}/teams/:teamId`, async ({ params }) => {
    const teamId = params.teamId as string;
    mockLogger.request('GET', `/teams/${teamId}`);

    await delay(mockConfig.delays.fast);

    const team = mockTeamDetails[teamId];
    if (!team) {
      mockLogger.response('GET', `/teams/${teamId}`, 404);
      return new HttpResponse(null, { status: 404 });
    }

    mockLogger.response('GET', `/teams/${teamId}`, 200, team);
    return HttpResponse.json(team);
  }),
];
