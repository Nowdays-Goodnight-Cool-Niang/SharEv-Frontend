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
      const code = error?.response?.data?.code;
      const message = (code && options.codeMap?.[code]) || options.fallbackMessage;

      console.error(`[API ERROR] ${code ?? 'Unknown'}: ${message}`, error);
      throw new Error(message);
    }
  };
}
