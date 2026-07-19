import { http, delay, HttpResponse } from 'msw';
import { mockConfig } from '../config';
import { mockLogger } from '../utils/logger';
import type {
  Team,
  TeamDetail,
  CreateTeamRequest,
  UpdateTeamRequest,
  Member,
  InviteMemberRequest,
  UpdateMemberRoleRequest,
} from '@/types/domain/team';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let nextTeamId = 100;
let nextMemberId = 100;

const mockMembers: Record<string, Member[]> = {
  '1': [
    { memberId: 1, name: '권나연', email: 'chichoc.dev@gmail.com', role: 'ADMIN', status: 'ACTIVATE' },
    { memberId: 2, name: '김개발', email: 'dev@example.com', role: 'COMMON', status: 'ACTIVATE' },
    { memberId: 3, name: '이디자인', email: 'design@example.com', role: 'COMMON', status: 'ACTIVATE' },
  ],
};

const mockTeams: Team[] = [
  {
    id: 1,
    title: 'GDC Campus Korea',
    content: '개발자 커뮤니티를 위한 다양한 행사를 기획하고 운영합니다.',
    createdAt: '2024-01-15T00:00:00',
    memberRole: 'ADMIN',
    headcount: 24,
  },
  {
    id: 2,
    title: 'Tech Valley Seoul',
    content: '서울의 스타트업과 개발자들을 위한 네트워킹 공간',
    createdAt: '2024-06-10T00:00:00',
    memberRole: 'COMMON',
    headcount: 18,
  },
  {
    id: 3,
    title: 'Startup Korea',
    content: '한국 스타트업 생태계를 만들어가는 사람들',
    createdAt: '2023-12-01T00:00:00',
    memberRole: 'COMMON',
    headcount: 42,
  },
];

const mockTeamDetails: Record<string, TeamDetail> = {
  '1': {
    id: 1,
    title: 'GDC Campus Korea',
    content: '개발자 커뮤니티를 위한 다양한 행사를 기획하고 운영합니다.',
    certification: 'CERTIFICATED',
    createdAt: '2024-01-15T00:00:00',
    headcount: 24,
    gatherings: [
      {
        id: 'd8f1e6c3-9a7b-4d4f-b6e1-5c8e3b7d2e0a',
        title: 'CODE:ME - 개발자 퍼스널 브랜딩 with AI',
        startAt: '2025-08-02T10:00:00',
        endAt: '2025-10-01T00:00:00',
        place: '구글 스타트업 캠퍼스',
      },
      {
        id: 'e9a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
        title: 'AI와 함께하는 스타트업 워크샵',
        startAt: '2025-09-15T14:00:00',
        endAt: '2025-09-15T18:00:00',
        place: '강남 D2 스타트업 팩토리',
      },
    ],
    members: [
      { name: '권나연', email: 'chichoc.dev@gmail.com', role: 'ADMIN' },
      { name: '김개발', email: 'dev@example.com', role: 'COMMON' },
      { name: '이디자인', email: 'design@example.com', role: 'COMMON' },
    ],
  },
  '2': {
    id: 2,
    title: 'Tech Valley Seoul',
    content: '서울의 스타트업과 개발자들을 위한 네트워킹 공간',
    certification: 'NONE',
    createdAt: '2024-06-10T00:00:00',
    headcount: 18,
    gatherings: [
      {
        id: 'f0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d',
        title: '스타트업 네트워킹 밋업',
        startAt: '2025-07-20T19:00:00',
        endAt: '2025-07-20T21:00:00',
        place: '위워크 강남점',
      },
    ],
    members: [
      { name: '박대표', email: 'ceo@techvalley.com', role: 'ADMIN' },
      { name: '권나연', email: 'chichoc.dev@gmail.com', role: 'COMMON' },
    ],
  },
  '3': {
    id: 3,
    title: 'Startup Korea',
    content: '한국 스타트업 생태계를 만들어가는 사람들',
    certification: 'CERTIFICATED',
    createdAt: '2023-12-01T00:00:00',
    headcount: 42,
    gatherings: [],
    members: [
      { name: '김창업', email: 'founder@startup.kr', role: 'ADMIN' },
      { name: '권나연', email: 'chichoc.dev@gmail.com', role: 'COMMON' },
      { name: '이투자', email: 'invest@vc.com', role: 'COMMON' },
    ],
  },
};

export const teamHandler = [
  // 팀 생성
  http.post(`${baseUrl}/teams`, async ({ request }) => {
    const body = (await request.json()) as CreateTeamRequest;
    mockLogger.request('POST', '/teams', body);

    await delay(mockConfig.delays.fast);

    const teamId = nextTeamId++;
    const now = new Date().toISOString();
    const newTeam: Team = {
      id: teamId,
      title: body.title,
      content: '',
      createdAt: now,
      memberRole: 'ADMIN',
      headcount: 1,
    };
    mockTeams.unshift(newTeam);

    mockTeamDetails[String(teamId)] = {
      id: teamId,
      title: body.title,
      content: '',
      certification: 'NONE',
      createdAt: now,
      headcount: 1,
      gatherings: [],
      members: [{ name: '나', email: 'me@example.com', role: 'ADMIN' }],
    };

    const responseData = { teamId };
    mockLogger.response('POST', '/teams', 201, responseData);
    return HttpResponse.json(responseData, { status: 201 });
  }),

  // 팀 목록 조회
  http.get(`${baseUrl}/teams`, async () => {
    mockLogger.request('GET', '/teams');

    await delay(mockConfig.delays.fast);

    mockLogger.response('GET', '/teams', 200, mockTeams);
    return HttpResponse.json(mockTeams);
  }),

  // 팀 수정
  http.patch(`${baseUrl}/teams/:teamId`, async ({ params, request }) => {
    const teamId = params.teamId as string;
    const body = (await request.json()) as UpdateTeamRequest;
    mockLogger.request('PATCH', `/teams/${teamId}`, body);

    await delay(mockConfig.delays.fast);

    const detail = mockTeamDetails[teamId];
    if (!detail) {
      mockLogger.response('PATCH', `/teams/${teamId}`, 404);
      return new HttpResponse(null, { status: 404 });
    }

    detail.title = body.title;
    if (body.content !== undefined) detail.content = body.content;
    if (body.certification !== undefined) detail.certification = body.certification;

    const team = mockTeams.find((t) => t.id === detail.id);
    if (team) {
      team.title = body.title;
      if (body.content !== undefined) team.content = body.content;
    }

    const responseData = { title: detail.title };
    mockLogger.response('PATCH', `/teams/${teamId}`, 200, responseData);
    return HttpResponse.json(responseData);
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

  // 멤버 목록 조회
  http.get(`${baseUrl}/teams/:teamId/members`, async ({ params }) => {
    const teamId = params.teamId as string;
    mockLogger.request('GET', `/teams/${teamId}/members`);

    await delay(mockConfig.delays.fast);

    const members = mockMembers[teamId] ?? [];
    mockLogger.response('GET', `/teams/${teamId}/members`, 200, members);
    return HttpResponse.json(members);
  }),

  // 멤버 초대
  http.post(`${baseUrl}/teams/:teamId/members`, async ({ params, request }) => {
    const teamId = params.teamId as string;
    const body = (await request.json()) as InviteMemberRequest;
    mockLogger.request('POST', `/teams/${teamId}/members`, body);

    await delay(mockConfig.delays.fast);

    if (!mockMembers[teamId]) mockMembers[teamId] = [];

    const existing = mockMembers[teamId].find((m) => m.email === body.email);
    if (existing) {
      mockLogger.response('POST', `/teams/${teamId}/members`, 409);
      return HttpResponse.json({ message: '이미 초대된 멤버입니다.' }, { status: 409 });
    }

    const memberId = nextMemberId++;
    const newMember: Member = {
      memberId,
      name: body.email.split('@')[0],
      email: body.email,
      role: 'COMMON',
      status: 'INVITE',
    };
    mockMembers[teamId].push(newMember);

    const responseData = { memberId, role: 'COMMON' as const, status: 'INVITE' };
    mockLogger.response('POST', `/teams/${teamId}/members`, 201, responseData);
    return HttpResponse.json(responseData, { status: 201 });
  }),

  // 멤버 역할 변경
  http.patch(`${baseUrl}/teams/:teamId/members/:memberId/role`, async ({ params, request }) => {
    const teamId = params.teamId as string;
    const memberId = Number(params.memberId);
    const body = (await request.json()) as UpdateMemberRoleRequest;
    mockLogger.request('PATCH', `/teams/${teamId}/members/${memberId}/role`, body);

    await delay(mockConfig.delays.fast);

    const members = mockMembers[teamId];
    const member = members?.find((m) => m.memberId === memberId);
    if (!member) {
      return new HttpResponse(null, { status: 404 });
    }

    member.role = body.role;
    const responseData = { memberId, role: body.role };
    mockLogger.response('PATCH', `/teams/${teamId}/members/${memberId}/role`, 200, responseData);
    return HttpResponse.json(responseData);
  }),

  // 멤버 제거
  http.delete(`${baseUrl}/teams/:teamId/members/:memberId`, async ({ params }) => {
    const teamId = params.teamId as string;
    const memberId = Number(params.memberId);
    mockLogger.request('DELETE', `/teams/${teamId}/members/${memberId}`);

    await delay(mockConfig.delays.fast);

    const members = mockMembers[teamId];
    if (!members) {
      return new HttpResponse(null, { status: 404 });
    }

    const index = members.findIndex((m) => m.memberId === memberId);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    members.splice(index, 1);
    mockLogger.response('DELETE', `/teams/${teamId}/members/${memberId}`, 200);
    return HttpResponse.json({ memberId });
  }),
];
