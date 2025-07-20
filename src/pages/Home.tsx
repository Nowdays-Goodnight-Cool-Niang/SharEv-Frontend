import BaseButton from '@/components/common/BaseButton';
import KakaoSvg from '@/assets/icons/ic_kakao.svg?react';
import { Link } from 'react-router';

function Home() {
  const handleKakaoLogin = () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className="background wrapper flex h-screen flex-col gap-[10%] overflow-hidden bg-gradient-to-b from-gray-50 to-white py-8 dark:bg-gray-900">
      <div className="flex w-full flex-1 animate-fade-in flex-col justify-end gap-4">
        <h1 className="font-museo text-7xl text-gray-800 dark:text-gray-50">SharE:v</h1>
        <p className="text-body-2 text-gray-600 dark:text-gray-50">
          나만의 명함을 만들어
          <br />
          새로운 연결을 만들어보세요!
        </p>
      </div>
      <BaseButton size="large" variant="kakao" onClick={handleKakaoLogin}>
        <span className="flex items-center justify-center gap-2">
          <KakaoSvg />
          카카오 로그인
        </span>
      </BaseButton>
      {/* TO유진: 혹시몰라 서비스동의 버튼 남겨두었으니, 필요없으시면 삭제해주세용 */}
      <div className="text-body-4 flex justify-center space-x-4 text-gray-400">
        <Link to="/terms" className="hover:text-gray-300">
          이용약관
        </Link>
        <span>|</span>
        <Link to="/privacy" className="hover:text-gray-300">
          개인정보처리방침
        </Link>
      </div>
    </div>
  );
}

export default Home;
