import { http, delay, HttpResponse } from 'msw';
import { mockConfig } from '../config';
import { mockLogger } from '../utils/logger';
import type { TeamDetail } from '@/types/domain/team';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const mockTeamDetails: Record<string, TeamDetail> = {
  '1': {
    id: '1',
    certificationCode: 'CERTIFICATED',
    title: 'GDC Campus Korea',
    content: '개발자 커뮤니티를 위한 다양한 행사를 기획하고 운영합니다.',
    participantCount: 24,
    activateFlag: true,
    createAt: '2024-01-15T00:00:00Z',
    updateAt: '2024-06-01T00:00:00Z',
    inviteLink: 'https://sharev.app/invite/abc123',
    gatherings: [
      {
        id: 'g1',
        title: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
        teamName: 'GDC Campus Korea',
        startAt: '2025-08-02T10:00:00Z',
        endAt: '2025-10-01T00:00:00Z',
        place: '구글 스타트업 캠퍼스',
      },
      {
        id: 'g2',
        title: 'AI와 함께하는 스타트업 워크샵',
        teamName: 'GDC Campus Korea',
        startAt: '2025-09-15T14:00:00Z',
        endAt: '2025-09-15T18:00:00Z',
        place: '강남 D2 스타트업 팩토리',
      },
    ],
    members: [
      { name: '권나연', email: 'chichoc.dev@gmail.com', role: 'admin' },
      { name: '김개발', email: 'dev@example.com', role: 'member' },
      { name: '이디자인', email: 'design@example.com', role: 'member' },
    ],
  },
};

export const teamHandler = [
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
