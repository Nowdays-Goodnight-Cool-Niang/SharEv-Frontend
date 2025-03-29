import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { kakaoAuthAPI } from '../apis/kakaoAuth';

function LoginRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchLogin = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (code && state) {
        const data = await kakaoAuthAPI.loginWithKakao({ code, state });
        if (data.isAuthenticated) {
          navigate('/event', { replace: true });
        } else {
          navigate('/profile-setup', { replace: true });
        }
      }
    };

    fetchLogin();
  }, [navigate, searchParams]);

  return <div className="text-gray-50">로그인 중입니다...</div>;
}

export default LoginRedirect;
