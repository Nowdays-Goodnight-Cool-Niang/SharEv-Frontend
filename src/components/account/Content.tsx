// @ts-nocheck
import { useNavigate } from 'react-router';
import Input from '../common/Input';
import ButtonPrimary from '../common/BaseButton';
import SnsForm from './SnsForm';
import { useEffect, useState } from 'react';
import { IFormAccount } from '../../types/formAccount';
import { useQueryAccount } from '../../hooks/useQueryAccount';
import { accountAPI } from '../../apis/accounts';

function Content() {
  const [formAccount, setFormAccount] = useState<IFormAccount>({});

  const navigate = useNavigate();
  const mutation = useQueryAccount();

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


  const handleProfileCompletion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await accountAPI.patchParticipantInfo(formAccount);
      navigate('/events')

    } catch {
      console.log('error');

    }
    
    
    
    
  };

  return (
    <form>
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