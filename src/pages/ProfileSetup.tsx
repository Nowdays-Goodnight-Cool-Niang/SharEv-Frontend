import FormHeader from '../components/profile/FormHeader';
import NoticeInfo from '../components/profile/NoticeInfo';
import FormContent from '../components/profile/FormContent';
import Wrapper from '../components/common/Wrapper';
import Header from '../components/common/Header';

function ProfileSetup() {
  return (
    <Wrapper>
      <Header />
      <main className="pt-11">
        <FormHeader />
        <NoticeInfo />
        <FormContent />
      </main>
    </Wrapper>
  );
}

export default ProfileSetup;
