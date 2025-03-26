import { useNavigate } from 'react-router';
import BaseButton from '../common/BaseButton';

import FormSection from './FormSection';
import { useState } from 'react';
import { IProfile } from '../../types';
import { useQueryAccount } from '../../hooks/useQueryAccount';

interface IContentProps {
  variant: 'setup' | 'edit';
}

function Content({ variant }: IContentProps) {
  const [formAccount, setFormAccount] = useState<IProfile>({});

  const navigate = useNavigate();
  const { patchProfileInfo } = useQueryAccount();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAccount((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      patchProfileInfo(formAccount, {
        onSuccess: () => {
          if (variant === 'setup') navigate('/event');
          else navigate('/user/:userId'); // TODO: userId 변수처리
        },
        onError: () => {
          console.log('Error occurred while updating profile');
        },
      });
    } catch {
      console.log('error');
    }
  };

  return (
    <form>
      <FormSection type="default" handleChange={handleChange} />
      <FormSection type="sns" handleChange={handleChange} />

      <div className="fixed bottom-11 left-6 right-6 max-w-full">
        <BaseButton
          isDisabled={!formAccount.name || !formAccount.email}
          onClick={(e) => handleProfileSubmit(e)}
        >
          {`프로필을 ${variant === 'setup' ? '완성했어요' : '수정할래요'}`}
        </BaseButton>
      </div>
    </form>
  );
}

export default Content;
