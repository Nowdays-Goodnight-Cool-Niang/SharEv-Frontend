/**
 * MSW 모킹 설정
 */
export const mockConfig = {
  /** 기본 응답 지연 시간 (ms) */
  defaultDelay: 500,

  /** 네트워크 속도별 지연 시간 */
  delays: {
    fast: 100,
    normal: 500,
    slow: 2000,
  },

  /** 에러 시뮬레이션 활성화 여부 */
  enableErrorScenarios: false,

  /** 로깅 활성화 여부 */
  enableLogging: true,
} as const;

/**
 * 랜덤 지연 (실제 네트워크 지연 시뮬레이션)
 */
export const randomDelay = (min = 300, max = 800) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
