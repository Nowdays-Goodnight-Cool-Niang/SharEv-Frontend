import BaseButton from '@/components/common/BaseButton';
import LogoImg from '@/assets/images/img_logo.png';
import KakaoSvg from '@/assets/icons/ic_kakao.svg?react';
import { Link } from 'react-router';
import { openFeedbackForm } from '@/utils/feedback';

function Home() {
  const handleKakaoLogin = () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  const handleFeedbackClick = () => {
    openFeedbackForm();
  };

  return (
    <div className="background wrapper flex h-screen flex-col gap-[5%] overflow-hidden bg-white py-14 dark:bg-gray-950">
      <button
        onClick={handleFeedbackClick}
        className="fixed right-4 top-4 z-50 flex h-8 items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 shadow-lg transition-colors hover:bg-gray-200"
        aria-label="피드백 제보하기"
      >
        💬 피드백
      </button>

      <div className="flex w-full flex-1 animate-fade-in flex-col items-center justify-center gap-8">
        <img src={LogoImg} className="w-36" />
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-museo text-5xl font-semibold italic tracking-tight text-gray-900 dark:text-gray-50">
            SharE<span className="text-blue-500 dark:text-blue-400">:</span>v
          </h1>
          <p className="text-center text-lg leading-7 tracking-tight text-gray-700 dark:text-gray-200">
            나만의 디지털 명함을 공유해
            <br />
            새로운 연결을 만들어봐요
          </p>
        </div>
      </div>
      <div className="space-y-8">
        <BaseButton size="large" variant="kakao" onClick={handleKakaoLogin}>
          <span className="flex items-center justify-center gap-2">
            <KakaoSvg />
            카카오 로그인
          </span>
        </BaseButton>
        <div className="flex justify-center space-x-3 text-xs text-gray-400 dark:text-gray-500">
          <Link
            to="/terms"
            className="transition-colors duration-300 hover:text-gray-500 hover:dark:text-gray-400"
          >
            이용약관
          </Link>
          <span>|</span>
          <Link
            to="/privacy"
            className="transition-colors duration-300 hover:text-gray-500 hover:dark:text-gray-400"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
