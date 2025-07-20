import Header from '@/components/common/Header';
import NoticeInfo from '@/components/common/NoticeInfo';
import FormContent from '@/components/profile/FormContent';

function ProfileEdit() {
  return (
    <div className="background flex flex-col bg-gray-50">
      <Header title="프로필 수정" />
      <div className="wrapper pb-6">
        <div className="mt-4">
          <NoticeInfo>모든 정보는 다른 사람에게 공개돼요</NoticeInfo>
        </div>
        <FormContent variant={'edit'} />
      </div>
    </div>
  );
}

export default ProfileEdit;
