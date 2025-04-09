import BaseButton from '../components/common/BaseButton';
import KakaoSvg from '../assets/icons/ic_kakao.svg?react';

function Home() {
  const handleKakaoLogin = () => {
    // TODO: 서버가 껴져 있을 경우 사용자에게 알려주기
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className="background relative bg-gray-900">
      <div className="absolute top-0 h-full w-full overflow-hidden">
        <img
          src="src/assets/images/img_geometric_graphic.png"
          className="absolute bottom-[15%] w-full"
        />
      </div>
      <div className="absolute bottom-0 h-screen w-full overflow-hidden">
        <div className="flex h-full flex-col items-center justify-between">
          <div className="wrapper flex w-full translate-y-5 animate-fade-in flex-col items-center justify-center gap-4 bg-gradient-to-b from-gray-900 to-gray-900/0 pb-20 pt-40 opacity-0">
            <h1 className="font-museo text-5xl text-gray-50">SharE:v</h1>
            <p className="text-title-1 text-center text-gray-50">
              프로필을 등록하고
              <br />
              간편하게 네트워킹하세요
            </p>
          </div>
          <div className="wrapper mb-11 w-full">
            <BaseButton variant="kakao" onClick={handleKakaoLogin}>
              <span className="flex items-center justify-center gap-2">
                <KakaoSvg />
                카카오 로그인
              </span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
