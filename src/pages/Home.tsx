import ButtonPrimary from '../components/common/ButtonPrimary';

function Home() {
  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className=''>
      <h1 className='text-white'>ShareMe</h1>
      <figure></figure>
      <figcaption className='text-white'>네트워킹을 더욱 간편하게</figcaption>
      <div className='fixed bottom-8 left-4 right-4 max-w-full'>
        <ButtonPrimary variant='kakao' onClick={handleKakaoLogin}>
          카카오 로그인
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default Home;
