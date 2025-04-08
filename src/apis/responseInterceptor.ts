import { accountInstance } from './accounts';
import { participantInstance } from './participants';
import { shareCardInstance } from './shareCards';
import { kakaoAuthInstance } from './kakaoAuth';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const setupAxiosInterceptors = () => {
  const handleResponseError = (error: AxiosError) => {
    if (error.response?.status && error.response.status === 401) {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      console.error('API returned 401. Redirecting to home...');
      toast.remove();
      toast('세션이 만료되었습니다. 재로그인해주세요', {
        icon: '🙏🏻',
        duration: 4000,
      });
    }
    return Promise.reject(error);
  };

  [accountInstance, participantInstance, shareCardInstance, kakaoAuthInstance].forEach(
    (instance) => {
      instance.interceptors.response.use((response) => response, handleResponseError);
    }
  );
};
