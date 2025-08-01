import { accountInstance } from './accounts';
import { eventInstance } from './event/event.api';
import { kakaoAuthInstance } from './kakao';
import { authInstance } from './auth';
import { AxiosError } from 'axios';
import { TOAST_MESSAGE } from '@/constants/message';
import { showCustomToast } from '@/utils/showToast';

export const setupAxiosInterceptors = () => {
  const handleResponseError = (error: AxiosError) => {
    if (!error.response) {
      showCustomToast({ message: TOAST_MESSAGE.ERROR_NETWORK });
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if (status === 401) {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      showCustomToast({ message: TOAST_MESSAGE.SESSION_EXPIRED });
    } else if (status === 500) {
      showCustomToast({ message: TOAST_MESSAGE.ERROR_SERVER });
    }

    if (error.config) {
      error.config._handledByInterceptor = true;
    }
    return Promise.reject(error);
  };

  [accountInstance, eventInstance, kakaoAuthInstance, authInstance].forEach((instance) => {
    instance.interceptors.response.use((response) => response, handleResponseError);
  });
};
