import BaseButton from '../components/common/BaseButton';
import KakaoSvg from '../assets/icons/ic_kakao.svg?react';

function Home() {
  const handleKakaoLogin = () => {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className="background relative bg-gray-900">
      <div className="h-screen w-full overflow-hidden">
        <img
          src="src/assets/images/img_geometric_graphic.png"
          className="absolute bottom-[15%] w-full"
        />
      </div>
      <div className="absolute bottom-0 h-screen w-full">
        <div className="flex h-full flex-col items-center justify-between gap-[40%] py-11">
          <div className="wrapper m-6 flex w-full translate-y-5 animate-fade-in flex-col items-center justify-center gap-4 bg-gray-900 p-9 opacity-0">
            <h1 className="font-museo text-5xl text-gray-50">SharE:v</h1>
            <p className="text-title-1 text-center text-gray-50">
              프로필을 등록하고
              <br />
              간편하게 네트워킹하세요
            </p>
          </div>
          <BaseButton variant="kakao" onClick={handleKakaoLogin}>
            <span className="flex items-center justify-center gap-2">
              <KakaoSvg />
              카카오 로그인
            </span>
          </BaseButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
