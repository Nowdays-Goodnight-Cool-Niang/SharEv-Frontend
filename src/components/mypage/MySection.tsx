import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MyProfile from '@/components/mypage/MyProfile';
import { accountAPI } from '@/apis/accounts';
import { authAPI } from '@/apis/auth';
import { TOAST_MESSAGE } from '@/utils/labels';
import MessageCircleSvg from '@/assets/icons/ic_message_circle.svg?react';
import LogOutSvg from '@/assets/icons/ic_logout.svg?react';
import UserMinusSvg from '@/assets/icons/ic_user_minus.svg?react';

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
    { title: '설정', buttons: settingButtons },
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
    </section>
  );
}

export default MySection;
