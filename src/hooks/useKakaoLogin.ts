import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { kakaoAuthAPI } from '@/apis/kakaoAuth';
import { toast } from 'react-hot-toast';
import { TOAST_MESSAGE } from '@/utils/labels';

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const loginWithKakaoCode = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code || !state) {
        toast.error(TOAST_MESSAGE.INVALID_LOGIN);
        navigate('/', { replace: true });
        return;
      }

      try {
        const data = await kakaoAuthAPI.loginWithKakao({ code, state });
        console.log(data);
        if (data.isAuthenticated) {
          toast.success(TOAST_MESSAGE.LOGIN_SUCCESS, { icon: '🙌🏻' });
          // TODO: 유진님께 여쭤보기 (이모지 앞에만 적용 & 로그아웃과 겹쳐 두 손으로 변경)
          navigate('/events', { replace: true });
        } else {
          navigate('/profile-setup', { replace: true });
        }
      } catch (error) {
        toast.error(TOAST_MESSAGE.LOGIN_FAILURE);
        navigate('/', { replace: true });
        console.error(error);
      }
    };

    loginWithKakaoCode();
  }, [navigate, searchParams]);
};
