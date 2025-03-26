import FormHeader from '../components/profile/FormHeader';
import NoticeInfo from '../components/profile/NoticeInfo';
import FormContent from '../components/profile/FormContent';
import Header from '../components/common/Header';

function ProfileSetup() {
  return (
    <>
      <Header />
      <main className="pt-11">
        <FormHeader />
        <NoticeInfo />
        <FormContent />
      </main>
    </>
  );
}

export default ProfileSetup;