import { PublicProfileResponse } from '@/types/api/event';

/**
 * 테스트 데이터 팩토리
 * 동적으로 mock 데이터 생성
 */

export const createMockProfile = (
  overrides?: Partial<PublicProfileResponse>
): PublicProfileResponse => ({
  type: 'FULL',
  name: '테스트 유저',
  email: 'test@example.com',
  linkedinUrl: 'https://linkedin.com/in/test',
  githubUrl: 'https://github.com/test',
  instagramUrl: 'https://instagram.com/test',
  introduce: '안녕하세요!',
  proudestExperience: '프로젝트 완성',
  toughExperience: '버그 디버깅',
  relationFlag: false,
  iconNumber: 1,
  ...overrides,
});

/**
 * 참여자 목록 생성 (페이지네이션 테스트용)
 */
export const createMockParticipants = (count: number): PublicProfileResponse[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockProfile({
      name: `유저 ${i + 1}`,
      email: `user${i + 1}@example.com`,
      iconNumber: (i % 10) + 1,
      relationFlag: i % 3 === 0, // 3명 중 1명은 등록됨
    })
  );
};
