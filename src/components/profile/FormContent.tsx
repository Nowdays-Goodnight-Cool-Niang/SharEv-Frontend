import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import BaseButton from '../common/BaseButton';
import FormSection from './FormSection';
import { IProfile } from '../../types';
import { useQueryAccount } from '../../hooks/useQueryAccount';
import { validateInput } from '../../utils/form';

interface IContentProps {
  variant: 'setup' | 'edit';
}

function Content({ variant }: IContentProps) {
  const navigate = useNavigate();
  const { profile, isLoading = true, error, patchProfileInfo } = useQueryAccount();

  const [formAccount, setFormAccount] = useState<IProfile>(profile || {});
  const [validationMessages, setValidationMessages] = useState<{ [key: string]: string }>({});
  const [isModified, setIsModified] = useState(false);

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validationMessage = validateInput(name, value);
    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: validationMessage || '',
    }));
  };

  const handleProfileSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationMessages = Object.keys(formAccount).reduce(
      (acc, key) => {
        const validationMessage = validateInput(key, formAccount[key as keyof IProfile] || '');
        if (validationMessage) acc[key] = validationMessage;
        return acc;
      },
      {} as { [key: string]: string }
    );

    if (Object.keys(validationMessages).length > 0) {
      setValidationMessages(validationMessages);
      return;
    }

    patchProfileInfo(formAccount, {
      onSuccess: () => {
        if (variant === 'setup') {
          navigate('/event');
        } else {
          navigate('/setting');
          toast.success('수정되었습니다.');
        }
      },
      onError: (error) => {
        toast.error('오류가 발생했습니다. 잠시 후에 시도해주세요.');
        console.error('Profile Edit error:', error);
      },
    });
  };

  return (
    <form>
      <FormSection
        type="default"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validationMessages={validationMessages}
      />
      <FormSection
        type="sns"
        handleChange={handleChange}
        handleBlur={handleBlur}
        validationMessages={validationMessages}
      />

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
