import { useNavigate } from 'react-router';
import Input from '../common/Input';
import ButtonSecondary from '../common/ButtonSecondary';
import ButtonPrimary from '../common/ButtonPrimary';

function Content() {
  const navigate = useNavigate();

  const handleProfileCompletion = () => {
    // TODO: 프로필 데이터를 서버에 저장하는 API 호출
    navigate('/events');
  };
  return (
    <form>
      <Input labelName='이름' />
      <Input labelName='전화번호(‘-’없이 입력)' placeholder='01012341234' />
      <Input labelName='SNS' />
      <ButtonSecondary>추가하기 +</ButtonSecondary>
      <ButtonPrimary onClick={handleProfileCompletion}>프로필을 완성했어요</ButtonPrimary>
    </form>
  );
}

export default Content;
