import NoticeInfo from '@/components/common/NoticeInfo';
import FormContent from '@/components/profile/FormContent';
import Header from '@/components/common/Header';
import useScrollToTop from '@/hooks/useScrollToTop';

function ProfileSetup() {
  // const { data, isLoading } = useQueryAuthStatus();

  useScrollToTop();

  // if (isLoading) return <div>로딩 중</div>;
  // if (data) return <Navigate to="/" replace />;

  return (
    <div className="background flex flex-col bg-gray-50">
      <Header title="프로필 생성" />
      <div className="wrapper pb-6">
        <div className="mt-4">
          <NoticeInfo>작성하신 정보는 연결된 멤버들과 공유되니 정확히 입력해주세요</NoticeInfo>
        </div>
        <FormContent variant={'setup'} />
      </div>
    </div>
  );
}

export default ProfileSetup;
