import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyProfile from '@/components/mypage/MyProfile';
import { authAPI } from '@/apis/auth';
import { TOAST_MESSAGE } from '@/utils/labels';
import { Link } from 'react-router';

function MySection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: performLogout } = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      toast(TOAST_MESSAGE.LOGOUT_SUCCESS, { icon: '👋🏻' });
    },
    onError: (error) => {
      console.error('Account logout error:', error.message);
    },
  });

  const handleInquiry = () => {
    toast(TOAST_MESSAGE.INQUIRY_UNDER_CONSTRUCTION, {
      icon: '🙏🏻',
    });
  };

  const handleAccountDeletion = () => {
    navigate('/account-deletion');
  };

  const settingButtons = [
    { title: '로그아웃', onClick: () => performLogout() },
    { title: '탈퇴하기', onClick: handleAccountDeletion },
    { title: '문의하기', onClick: handleInquiry },
  ];

  const datas = [
    { title: '프로필', content: <MyProfile /> },
    { title: '계정', buttons: settingButtons },
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
                  } ${idx === data.buttons.length - 1 ? 'rounded-b border-none' : ''}`}
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
      <div className="text-body-4 mt-4 flex justify-center space-x-4 text-gray-400">
        <Link to="/terms" className="hover:text-gray-300">
          이용약관
        </Link>
        <span>|</span>
        <Link to="/privacy" className="hover:text-gray-300">
          개인정보처리방침
        </Link>
      </div>
    </section>
  );
}

export default MySection;
