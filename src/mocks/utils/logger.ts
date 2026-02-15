import { mockConfig } from '../config';

/**
 * MSW 요청/응답 로거
 */
export const mockLogger = {
  request: (method: string, url: string, body?: unknown) => {
    if (!mockConfig.enableLogging) return;

    console.group(`🔵 [MSW ${method}] ${url}`);
    if (body) console.log('Body:', body);
    console.groupEnd();
  },

  response: (method: string, url: string, status: number, data?: unknown) => {
    if (!mockConfig.enableLogging) return;

    const emoji = status >= 400 ? '🔴' : '🟢';
    console.group(`${emoji} [MSW ${method}] ${url} - ${status}`);
    if (data) console.log('Response:', data);
    console.groupEnd();
  },

  error: (method: string, url: string, error: Error) => {
    if (!mockConfig.enableLogging) return;

    console.group(`🔴 [MSW ${method}] ${url} - ERROR`);
    console.error(error);
    console.groupEnd();
  },
};
