interface IErrorHandlerOptions {
  codeMap?: Record<string, string>; // 에러코드: 메시지
  fallbackMessage: string; // 기본 메시지
}

export function withErrorHandler<T>(
  options: IErrorHandlerOptions
): (fn: () => Promise<T>) => Promise<T | null> {
  return async (fn) => {
    try {
      return await fn();
    } catch (error: any) {
      if (error?.config?._handledByInterceptor) {
        throw error;
      }
      const errorCode = error?.response?.data?.errorCode;
      const message = (errorCode && options.codeMap?.[errorCode]) || options.fallbackMessage;

      console.error(`[API ERROR] ${errorCode ?? 'Unknown'}: ${message}`, error);
      throw new Error(message);
    }
  };
}

export const ERROR_MSG = {
  profile: {
    fetch: '프로필 정보를 불러오지 못했어요.',
    create: '프로필 생성에 실패했어요.',
    update: '프로필 수정에 실패했어요.',
    fetchByPin: '상대방 프로필을 불러오지 못했어요.',
    codeMap: {
      PROFILE_ALREADY_EXISTS: '이미 존재하는 프로필입니다.',
      INVALID_EVENT_ID: '잘못된 이벤트입니다.',
    },
  },
};
