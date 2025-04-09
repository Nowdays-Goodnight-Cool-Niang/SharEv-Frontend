import FormHeader from '../components/profile/FormHeader';
import NoticeInfo from '../components/common/NoticeInfo';
import FormContent from '../components/profile/FormContent';

function ProfileSetup() {
  return (
    <main className="pt-11">
      <FormHeader content="프로필을 완성하세요" />
      <div className="mt-5">
        <NoticeInfo>모든 정보는 다른 사람에게 공개돼요</NoticeInfo>
      </div>
      <FormContent variant={'edit'} />
    </main>
  );
}

export default ProfileSetup;
