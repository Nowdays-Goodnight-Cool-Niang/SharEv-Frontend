import ButtonPrimary from '../components/common/ButtonPrimary';

function Home() {
  const handleKakaoLogin = () => {
    console.log(import.meta.env.VITE_API_BASE_URL);
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-blue-500">
      <div className="flex flex-col items-center justify-center">
        <div className="h-80 w-80">
          <img className="w-full" src="./phone.png" />
        </div>
        <h1 className="mb-4 text-6xl font-extrabold">
          <span className="text-white">Share</span>
          <span className="text-green-light">Me</span>
        </h1>
        <p className="text-base font-semibold text-white">네트워킹을 더욱 간편하게</p>
      </div>
      <div className="fixed bottom-8 left-4 right-4 max-w-full">
        <ButtonPrimary variant="kakao" onClick={handleKakaoLogin}>
          카카오 로그인
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default Home;
