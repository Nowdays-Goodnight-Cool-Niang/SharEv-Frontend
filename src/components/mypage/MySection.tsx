import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyProfile from '@/components/mypage/MyProfile';
import { authAPI } from '@/apis/auth';
import { Link } from 'react-router';
import MessageCircleSvg from '@/assets/icons/ic_message_circle.svg?react';
import LogOutSvg from '@/assets/icons/ic_logout.svg?react';
import UserMinusSvg from '@/assets/icons/ic_user_minus.svg?react';
import { TOAST_MESSAGE } from '@/constants/message';
import { showCustomToast } from '@/utils/showToast';

function MySection() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: performLogout } = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/');
      showCustomToast({ message: TOAST_MESSAGE.LOGOUT_SUCCESS });
    },
    onError: (error) => {
      console.error('Account logout error:', error.message);
    },
  });

  const handleInquiry = () => {
    showCustomToast({ message: TOAST_MESSAGE.INQUIRY_UNDER_CONSTRUCTION });
  };

  const handleAccountDeletion = () => {
    navigate('/account-deletion');
  };

  const settingButtons = [
    {
      title: '문의하기',
      onClick: handleInquiry,
      icon: MessageCircleSvg,
    },
    {
      title: '로그아웃',
      onClick: () => performLogout(),
      icon: LogOutSvg,
    },
    {
      title: '탈퇴하기',
      onClick: handleAccountDeletion,
      icon: UserMinusSvg,
    },
  ];

  const datas = [
    { title: '프로필', content: <MyProfile /> },
    { title: '계정', buttons: settingButtons },
  ];

  return (
    <section className="wrapper space-y-4 pb-6 pt-2">
      {datas.map((data) => (
        <div className="rounded-xl border border-gray-100 bg-white p-6" key={data.title}>
          <h2 className="mb-4 font-semibold text-gray-700">{data.title}</h2>
          {data.buttons ? (
            <div className="flex flex-col">
              {data.buttons.map((button, idx) => {
                const IconComponent = button.icon;
                return (
                  <button
                    key={idx}
                    onClick={button.onClick}
                    className="group flex w-full items-center py-4 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 transition-colors">
                        <IconComponent width={20} height={20} className={'text-gray-600'} />
                      </div>
                      <span className={`tracking-tight text-gray-600`}>{button.title}</span>
                    </div>
                  </button>
                );
              })}
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
