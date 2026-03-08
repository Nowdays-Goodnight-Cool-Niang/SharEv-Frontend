/**
 * 팀 역할
 * - admin: 관리자 (팀 설정, 멤버 관리, 행사 개최 가능)
 * - member: 일반 멤버 (행사 참여 가능)
 */
export type TeamRole = 'admin' | 'member';

/**
 * 팀 인증 상태
 * - NONE: 미인증 (내부 행사만 개최 가능)
 * - CERTIFICATED: 인증됨 (공개 행사 개최 가능)
 * - ETC: 기타
 */
export type TeamCertificationStatus = 'NONE' | 'CERTIFICATED' | 'ETC';

/**
 * 팀 정보
 */
export interface Team {
  /** 팀 고유 ID */
  id: string;

  /** 팀 인증 코드 */
  certificationCode: TeamCertificationStatus;

  /** 팀 이름 */
  title: string;

  /** 팀 설명 */
  content: string;

  /** 팀원 수 */
  participantCount: number;

  /** 팀 활성화 여부 */
  activateFlag: boolean;

  /** 팀 생성일 */
  createAt: string;

  /** 팀 수정일 */
  updateAt: string;
}

/**
 * 팀 인증 여부 확인 헬퍼 함수
 */
export const isVerifiedTeam = (team: Team): boolean => {
  return team.certificationCode === 'CERTIFICATED';
};
