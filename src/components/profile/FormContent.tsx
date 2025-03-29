import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import BaseButton from '../common/BaseButton';
import FormSection from './FormSection';
import { IProfile } from '../../types';
import { useQueryAccount } from '../../hooks/useQueryAccount';

interface IContentProps {
  variant: 'setup' | 'edit';
}

function Content({ variant }: IContentProps) {
  const [formAccount, setFormAccount] = useState<IProfile>({});
  const [isModified, setIsModified] = useState(false);

  const navigate = useNavigate();
  const { profile, isLoading = true, error, patchProfileInfo } = useQueryAccount();

  useEffect(() => {
    if (profile) {
      setFormAccount(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (variant === 'edit' && profile) {
      const isChanged = Object.keys(profile).some(
        (key) => formAccount[key as keyof IProfile] !== profile[key as keyof IProfile]
      );
      setIsModified(isChanged);
    }
  }, [formAccount, profile, variant]);

  useEffect(() => {
    if (isLoading) {
      const loadingToastId = toast.loading('프로필 정보를 불러오는 중입니다.');
      return () => toast.dismiss(loadingToastId);
    }
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast.error('프로필 정보를 불러오는 중 오류가 발생했습니다.');
    }
  }, [error]);

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
          if (variant === 'setup') {
            navigate('/event');
          } else {
            navigate('/setting');
            toast.success('수정되었습니다.');
          }
        },
        onError: () => {
          toast.error('오류가 발생했습니다. 잠시 후에 시도해주세요.');
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
          isDisabled={variant === 'edit' ? !isModified : !formAccount.name || !formAccount.email}
          onClick={(e) => handleProfileSubmit(e)}
        >
          {`프로필을 ${variant === 'setup' ? '완성했어요' : '수정할래요'}`}
        </BaseButton>
      </div>
    </form>
  );
}

export default Content;
