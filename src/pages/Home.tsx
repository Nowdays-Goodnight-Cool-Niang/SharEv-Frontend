import ButtonPrimary from '../components/common/ButtonPrimary';

function Home() {
  const handleKakaoLogin = () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
    window.location.assign(url);
  };

  return (
    <div className='flex justify-center items-center bg-blue-500 w-screen h-screen'>
     <div className='flex flex-col justify-center items-center'>
    <div className='w-15 h-15'>
    <img  src='./phone.png'/>
    </div>
      <h1 className='text-6xl font-extrabold mb-4'><span className='text-white'>Share</span><span className='text-green-light'>Me</span></h1>
      <p className='text-white text-base font-semibold'>네트워킹을 더욱 간편하게</p>
     </div>
      <div className='fixed bottom-8 left-4 right-4 max-w-full'>
        <ButtonPrimary variant='kakao' onClick={handleKakaoLogin}>
          카카오 로그인
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default Home;
