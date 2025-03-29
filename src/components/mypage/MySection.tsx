import MyProfile from './MyProfile';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function MySection() {
  const navigate = useNavigate();
  const handleInquiry = () => {
    toast('준비 중입니다.', {
      icon: '🙏🏻',
    });
  };

  const handleLogout = async () => {
    try {
      const logoutApi = `${import.meta.env.VITE_API_BASE_URL}/logout`;
      const response = await fetch(logoutApi, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/');
        toast.success('로그아웃 되었습니다.');
      } else {
        toast.error('로그아웃에 실패했습니다. 잠시 후에 시도해주세요.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('오류가 발생했습니다. 잠시 후에 시도해주세요.');
    }
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
