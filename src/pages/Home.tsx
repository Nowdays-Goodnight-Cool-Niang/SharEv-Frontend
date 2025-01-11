import ButtonPrimary from '../components/common/ButtonPrimary';

function Home() {
  const handleKakaoLogin = () => {
    // 예: Kakao.Auth.login({
    //   success: function(authObj) {
    //     console.log(authObj);
    //     // 로그인 성공 시 프로필 완성 페이지로 이동
    //     navigate('/profile-completion');
    //   },
    //   fail: function(err) {
    //     console.error(err);
    //   },
    // });
  };

  return (
    <div className=''>
      <h1 className='text-white'>ShareMe</h1>
      <figure></figure>
      <figcaption className='text-white'>네트워킹을 더욱 간편하게</figcaption>
      <div className='fixed bottom-8 max-w-full'>
        <ButtonPrimary variant='kakao' onClick={handleKakaoLogin}>
          카카오 로그인
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default Home;
