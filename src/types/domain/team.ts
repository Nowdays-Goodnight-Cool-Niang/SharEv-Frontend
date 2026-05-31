/**
 * 팀 멤버 역할 (BE: MemberRoleType)
 * - ADMIN: 관리자 (팀 설정, 멤버 관리, 행사 개최 가능)
 * - COMMON: 일반 멤버 (행사 참여 가능)
 */
export type MemberRoleType = 'ADMIN' | 'COMMON';

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
 * 팀 상세 정보 (BE: ResponseTeamDetailInfoDto)
 * TODO: inviteLink는 BE에 아직 없음 — 추후 BE 추가 시 연동
 */
export interface TeamDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  headcount: number;
  inviteLink?: string;
  gatherings: TeamGathering[];
  members: TeamMember[];
}
