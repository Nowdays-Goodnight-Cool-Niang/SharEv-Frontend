import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyProfile from '@/components/mypage/MyProfile';
import { accountAPI } from '@/apis/accounts';
import { authAPI } from '@/apis/auth';
import { TOAST_MESSAGE } from '@/utils/labels';

function MySection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: performAccountDeletion } = useMutation({
    mutationFn: accountAPI.deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      toast.success(TOAST_MESSAGE.ACCOUNT_DELETION_SUCCESS, { icon: '🙇🏻‍♀️' });
    },
    onError: (error) => {
      console.error('Account deletion error:', error.message);
    },
  });

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

  const handleAccountDeletion = async () => {
    // TODO: 개인정보 처리 관련 별도 페이지 필요
    const confirmDeletion = window.confirm(
      '정말로 탈퇴하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다.'
    );
    if (confirmDeletion) {
      performAccountDeletion();
    }
  };

  const settingButtons = [
    { title: '문의하기', onClick: handleInquiry },
    { title: '로그아웃', onClick: () => performLogout() },
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
