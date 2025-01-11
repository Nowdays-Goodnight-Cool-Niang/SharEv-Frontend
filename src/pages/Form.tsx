import ButtonPrimary from '../components/common/ButtonPrimary';
import ButtonSecondary from '../components/common/ButtonSecondary';
import Input from '../components/common/Input';

function Form() {
  return (
    <div>
      <h1 className='text-title'>프로필을 완성하세요</h1>
      <Input />
      <ButtonSecondary>추가하기 +</ButtonSecondary>
      <ButtonPrimary>프로필을 완성했어요</ButtonPrimary>
    </div>
  );
}

export default Form;
