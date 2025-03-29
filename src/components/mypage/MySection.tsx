import MyProfile from './MyProfile';
import toast from 'react-hot-toast';

function MySection() {
  const handleInquiry = () => {
    toast('준비 중입니다.', {
      icon: '🙏🏻',
    });
  };

  const handleLogout = () => {
    // TODO: 로그아웃 API 호출
  };

  const handleAccountDeletion = () => {
    // TODO: 탈퇴 (로직 논의 필요 - 재확인 or 별도 페이지)
  };

  const settingButtons = [
    { title: '문의하기', onClick: handleInquiry },
    { title: '로그아웃', onClick: handleLogout },
    { title: '탈퇴하기', onClick: handleAccountDeletion },
  ];
  const datas = [
    { title: '프로필', content: <MyProfile /> },
    { title: '설정', buttons: settingButtons },
  ];

  return (
    <section className="mt-6">
      {datas.map((data) => (
        <div className="mt-10" key={data.title}>
          <h2 className="text-title-2 mb-4 text-gray-400">{data.title}</h2>
          {data.buttons ? (
            <div className="flex flex-col">
              {data.buttons.map((button, idx) => (
                <button
                  key={idx}
                  onClick={button.onClick}
                  className={`text-body-3 border border-gray-700 bg-gray-800 p-5 text-left text-gray-200 hover:bg-gray-700 ${
                    idx === 0 ? 'rounded-t' : ''
                  } ${idx === data.buttons.length - 1 ? 'rounded-b border-none text-orange-500' : ''}`}
                >
                  {button.title}
                </button>
              ))}
            </div>
          ) : (
            data.content
          )}
        </div>
      ))}
    </section>
  );
}

export default MySection;
