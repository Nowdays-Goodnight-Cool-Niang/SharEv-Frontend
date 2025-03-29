import FormHeader from '../components/profile/FormHeader';
import NoticeInfo from '../components/profile/NoticeInfo';
import FormContent from '../components/profile/FormContent';

function ProfileEdit() {
  return (
    <main className="pt-11">
      <FormHeader content="프로필을 수정하세요" />
      <NoticeInfo />
      <FormContent variant={'edit'} />
    </main>
  );
}

export default ProfileEdit;
