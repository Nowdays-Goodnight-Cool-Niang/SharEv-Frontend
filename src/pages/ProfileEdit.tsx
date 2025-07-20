import FormHeader from '@/components/profile/FormHeader';
import NoticeInfo from '@/components/common/NoticeInfo';
import FormContent from '@/components/profile/FormContent';

function ProfileEdit() {
  return (
    <div className="background flex flex-col bg-white">
      <div className="wrapper pb-6 pt-11">
        <FormHeader content="프로필을 수정하세요" />
        <div className="mt-5">
          <NoticeInfo>모든 정보는 다른 사람에게 공개돼요</NoticeInfo>
        </div>
        <FormContent variant={'edit'} />
      </div>
    </div>
  );
}

export default ProfileEdit;
