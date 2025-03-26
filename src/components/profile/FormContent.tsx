import { useNavigate } from 'react-router';
import ButtonPrimary from '../common/BaseButton';

import FormSection from './FormSection';
import { useState } from 'react';
import { IFormAccount } from '../../types/formAccount';
import { accountAPI } from '../../apis/accounts';

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

  const handleProfileCompletion = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await accountAPI.patchParticipantInfo(formAccount);
      navigate('/events');
    } catch {
      console.log('error');
    }
  };

  return (
    <form>
      <FormSection type="default" handleChange={handleChange} />
      <FormSection type="sns" handleChange={handleChange} />

      <div className="fixed bottom-11 left-6 right-6 max-w-full">
        <ButtonPrimary isDisabled={!formAccount.name} onClick={(e) => handleProfileCompletion(e)}>
          프로필을 완성했어요
        </ButtonPrimary>
      </div>
    </form>
  );
}

export default Content;
