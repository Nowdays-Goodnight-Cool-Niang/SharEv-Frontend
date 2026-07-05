/**
 * 팀 멤버 역할 (BE: MemberRoleType)
 * - ADMIN: 관리자 (팀 설정, 멤버 관리, 행사 개최 가능)
 * - COMMON: 일반 멤버 (행사 참여 가능)
 */
export type MemberRoleType = 'ADMIN' | 'COMMON';

/**
 * 팀 타입 (BE: TeamCertification)
 */
export type TeamType = 'NONE' | 'CERTIFICATED';

export const TEAM_TYPE_OPTIONS: Record<TeamType, { label: string; description: string }> = {
  NONE: { label: '일반 팀', description: '팀 내부 행사만 생성할 수 있어요' },
  CERTIFICATED: { label: '공식 팀', description: '공개 행사를 생성할 수 있어요' },
};

/**
 * 팀 정보 (BE: ResponseTeamInfoDto)
 */
export interface Team {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  memberRole: MemberRoleType;
  headcount: number;
}

/**
 * 팀 상세 내 행사 정보 (BE: GatheringInfoDto)
 */
export interface TeamGathering {
  title: string;
  startAt: string;
  endAt: string;
  place: string;
}

/**
 * 팀 상세 내 멤버 정보 (BE: TeamMemberInfoResponse)
 */
export interface TeamMember {
  name: string;
  email: string;
  role: MemberRoleType;
}

/**
 * 멤버 관리용 멤버 정보 (BE: MemberResponse)
 */
export type MemberStatus = 'INVITE' | 'ACTIVATE';

export interface Member {
  memberId: number;
  name: string;
  email: string;
  role: MemberRoleType;
  status: MemberStatus;
}

/**
 * 팀 생성 요청 (BE: CreateTeamRequest)
 */
export interface CreateTeamRequest {
  title: string;
}

/**
 * 팀 생성 응답 (BE: CreateTeamResponse)
 */
export interface CreateTeamResponse {
  teamId: number;
}

/**
 * 팀 수정 요청 (BE: UpdateTeamRequest)
 */
export interface UpdateTeamRequest {
  title: string;
  content?: string;
  certification?: TeamType;
}

/**
 * 팀 수정 응답 (BE: TeamUpdateInfoResponse)
 */
export interface UpdateTeamResponse {
  title: string;
}

/**
 * 멤버 초대 요청 (BE: InviteMemberRequest)
 */
export interface InviteMemberRequest {
  email: string;
}

/**
 * 멤버 역할 변경 요청 (BE: UpdateMemberRoleRequest)
 */
export interface UpdateMemberRoleRequest {
  role: MemberRoleType;
}

/**
 * 팀 상세 정보 (BE: ResponseTeamDetailInfoDto)
 * TODO: inviteLink는 BE에 아직 없음 — 추후 BE 추가 시 연동
 */
export interface TeamDetail {
  id: number;
  title: string;
  content: string;
  certification: TeamType;
  createdAt: string;
  headcount: number;
  inviteLink?: string;
  gatherings: TeamGathering[];
  members: TeamMember[];
}
