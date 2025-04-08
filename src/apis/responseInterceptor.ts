import { accountInstance } from './accounts';
import { participantInstance } from './participants';
import { shareCardInstance } from './shareCards';
import { kakaoAuthInstance } from './kakaoAuth';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const setupAxiosInterceptors = () => {
  const handleResponseError = (error: AxiosError) => {
    if (error.response?.status && error.response.status >= 400) {
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      console.error('API returned 404. Redirecting to home...');
      toast.dismiss();
      toast('세션이 만료되었습니다. 재로그인해주세요', {
        icon: '🙏🏻',
      });
    }
    // TODO: 서버 시큐리티 검증 수정되면 상태코드 바꾸기
    return Promise.reject(error);
  };

  [accountInstance, participantInstance, shareCardInstance, kakaoAuthInstance].forEach(
    (instance) => {
      instance.interceptors.response.use((response) => response, handleResponseError);
    }
  );
};
