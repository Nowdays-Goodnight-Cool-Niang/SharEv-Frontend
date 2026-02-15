import { HttpResponse } from 'msw';

/**
 * 시나리오별 응답 생성 유틸리티
 */

type ScenarioType = 'success' | 'error' | 'unauthorized' | 'notFound' | 'serverError';

/**
 * 에러 응답 생성
 */
export const createErrorResponse = (status: number, message: string, code?: string) => {
  return HttpResponse.json(
    {
      error: {
        message,
        code: code || `ERROR_${status}`,
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
};

/**
 * 시나리오 기반 응답
 */
export const scenarioResponses = {
  success: <T>(data: T) => HttpResponse.json(data as never),

  unauthorized: () => createErrorResponse(401, 'Unauthorized', 'UNAUTHORIZED'),

  forbidden: () => createErrorResponse(403, 'Forbidden', 'FORBIDDEN'),

  notFound: (resource = 'Resource') =>
    createErrorResponse(404, `${resource} not found`, 'NOT_FOUND'),

  badRequest: (message = 'Bad request') => createErrorResponse(400, message, 'BAD_REQUEST'),

  serverError: () => createErrorResponse(500, 'Internal server error', 'SERVER_ERROR'),

  timeout: () => HttpResponse.error(), // 네트워크 에러 시뮬레이션
};

/**
 * 환경변수로 시나리오 제어
 * 예: VITE_MOCK_SCENARIO=error 로 설정하면 에러 응답 반환
 */
export const getScenarioResponse = <T>(successData: T, scenario?: ScenarioType) => {
  const envScenario = import.meta.env.VITE_MOCK_SCENARIO as ScenarioType | undefined;
  const activeScenario = scenario || envScenario || 'success';

  switch (activeScenario) {
    case 'error':
    case 'serverError':
      return scenarioResponses.serverError();
    case 'unauthorized':
      return scenarioResponses.unauthorized();
    case 'notFound':
      return scenarioResponses.notFound();
    case 'success':
    default:
      return scenarioResponses.success(successData);
  }
};
