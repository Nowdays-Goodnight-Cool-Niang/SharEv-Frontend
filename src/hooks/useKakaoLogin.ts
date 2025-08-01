import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { kakaoAuthAPI } from '@/apis/kakao';
import { TOAST_MESSAGE } from '@/constants/message';
import { ROUTES } from '@/constants/routes';
import { showCustomToast } from '@/utils/showToast';

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loginWithKakaoCode = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code || !state) {
        showCustomToast({ message: TOAST_MESSAGE.INVALID_LOGIN });
        navigate(ROUTES.ROOT, { replace: true });
        return;
      }

      try {
        const data = await kakaoAuthAPI.loginWithKakao({ code, state });
        if (data.isAuthenticated) {
          showCustomToast({ message: TOAST_MESSAGE.LOGIN_SUCCESS });
          navigate(ROUTES.EVENTS, { replace: true });
        } else {
          navigate(ROUTES.PROFILE_SETUP, { replace: true });
        }
      } catch (error) {
        showCustomToast({ message: TOAST_MESSAGE.LOGIN_FAILURE });
        navigate(ROUTES.ROOT, { replace: true });
      }
    };

    loginWithKakaoCode();
  }, [navigate, searchParams]);
};
