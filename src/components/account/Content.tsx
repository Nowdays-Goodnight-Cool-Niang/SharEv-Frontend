// @ts-nocheck
import { useNavigate } from 'react-router';
import Input from '../common/Input';
import ButtonPrimary from '../common/ButtonPrimary';
import SnsForm from './SnsForm';
import { useEffect, useState } from 'react';
import ImgForm from './ImgForm';
import { IFormAccount } from '../../types/formAccount';

function Content() {
  const [formAccount, setFormAccount] = useState<IFormAccount>({});

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAccount((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSnsChange = (data: { [key: string]: string }) => {
    setFormAccount((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  useEffect(() => {
    console.log(formAccount);
  }, [formAccount]);

  const handleProfileCompletion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: 프로필 데이터를 서버에 저장하는 API 호출
    navigate('/events');
  };
  return (
    <form>
      <ImgForm setFormAccount={setFormAccount} />
      <Input labelName='이름' placeholder='삐약이' name='name' required={true} onChange={handleChange} />
      <Input labelName='전화번호(‘-’없이 입력)' placeholder='01012341234' name='phone' onChange={handleChange} />
      <SnsForm onChange={handleSnsChange} />

      <div className='fixed bottom-8 left-4 right-4 max-w-full'>
        <ButtonPrimary isDisabled={!formAccount.name} onClick={(e) => handleProfileCompletion(e)}>
          프로필을 완성했어요
        </ButtonPrimary>
      </div>
    </form>
  );
}

export default Content;
