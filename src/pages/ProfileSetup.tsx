import FormHeader from '../components/profile/FormHeader';
import NoticeInfo from '../components/profile/NoticeInfo';
import FormContent from '../components/profile/FormContent';
import Wrapper from '../components/common/Wrapper';
import Header from '../components/common/Header';

function ProfileSetup() {
  return (
    <Wrapper>
      <Header />
      <FormHeader />
      <NoticeInfo />
      <FormContent />
    </Wrapper>
  );
}

export default ProfileSetup;
