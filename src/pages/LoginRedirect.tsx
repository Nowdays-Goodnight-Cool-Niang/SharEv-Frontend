import LoadingSpinner from '../components/common/LoadingSpinner';
import { useKakaoLogin } from '../hooks/useKakaoLogin';

function LoginRedirect() {
  useKakaoLogin();

  return (
    <div className="background flex h-screen flex-col items-center justify-center gap-4 bg-gray-800">
      <LoadingSpinner />
      <span className="text-label-2 text-gray-50">로그인 중입니다...</span>
    </div>
  );
}

export default LoginRedirect;
