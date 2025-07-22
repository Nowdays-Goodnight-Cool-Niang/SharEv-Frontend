import BaseButton from '@/components/common/BaseButton';
import LogoImg from '@/assets/images/img_logo.png';
import KakaoSvg from '@/assets/icons/ic_kakao.svg?react';
import { Link } from 'react-router';

function Home() {
  const handleKakaoLogin = () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className="background wrapper flex h-screen flex-col gap-[5%] overflow-hidden bg-white py-14 dark:bg-slate-950">
      <div className="flex w-full flex-1 animate-fade-in flex-col items-center justify-center gap-8">
        <img src={LogoImg} className="w-36" />
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-museo text-5xl font-semibold italic tracking-tight text-slate-900 dark:text-slate-50">
            SharE<span className="text-blue-500 dark:text-blue-400">:</span>v
          </h1>
          <p className="text-center text-lg leading-7 tracking-tight text-slate-700 dark:text-slate-200">
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
        <div className="flex justify-center space-x-3 text-xs text-slate-400 dark:text-slate-500">
          <Link
            to="/terms"
            className="transition-colors duration-300 hover:text-slate-500 hover:dark:text-slate-400"
          >
            이용약관
          </Link>
          <span>|</span>
          <Link
            to="/privacy"
            className="transition-colors duration-300 hover:text-slate-500 hover:dark:text-slate-400"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
