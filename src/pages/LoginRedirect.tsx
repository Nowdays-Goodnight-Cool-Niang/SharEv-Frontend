import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useKakaoLogin } from '@/hooks/useKakaoLogin';

function LoginRedirect() {
  useKakaoLogin();

  return (
    <div className="background flex flex-col items-center justify-center gap-10 bg-gray-50 dark:bg-gray-800">
      <LoadingSpinner />
      <span className="text-body-2 text-gray-600 dark:text-gray-50">로그인 중입니다</span>
    </div>
  );
}

export default LoginRedirect;
