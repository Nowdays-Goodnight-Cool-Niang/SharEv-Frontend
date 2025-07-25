import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import { IProfile } from '@/types/common/ui';
import BaseButton from '@/components/common/BaseButton';
import Checkbox from '@/components/common/Checkbox';
import FormSection from '@/components/profile/FormSection';
import { useQueryAccount } from '@/hooks/useQueryAccount';
import { validateInput } from '@/utils/form';
import { TOAST_MESSAGE } from '@/utils/labels';

interface IContentProps {
  variant: 'setup' | 'edit';
}

const agreementItems = [
  {
    key: 'terms' as const,
    label: '이용약관 동의',
    linkTo: '/terms',
    linkText: '보기',
  },
  {
    key: 'privacy' as const,
    label: '개인정보 수집·이용 동의',
    linkTo: '/privacy-consent',
    linkText: '보기',
  },
];

function Content({ variant }: IContentProps) {
  const navigate = useNavigate();
  const { profile, isLoading, patchProfileInfo } = useQueryAccount();

  const [formAccount, setFormAccount] = useState<IProfile>(profile || ({} as IProfile));
  const [validationMessages, setValidationMessages] = useState<{ [key: string]: string }>({});
  const [isModified, setIsModified] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  useEffect(() => {
    if (variant === 'edit' && profile) {
      const isChanged = Object.keys(profile).some(
        (key) => formAccount[key as keyof IProfile] !== profile[key as keyof IProfile]
      );
      setIsModified(isChanged);
    }
  }, [formAccount, profile, variant]);

  useEffect(() => {
    if (!isLoading && profile && variant === 'edit') {
      setFormAccount((prevFormAccount) => {
        if (JSON.stringify(prevFormAccount) === JSON.stringify({})) {
          return { ...profile };
        }
        return prevFormAccount;
      });
    } else if (isLoading) {
      const loadingToastId = toast.loading(TOAST_MESSAGE.PROFILE_LOADING);
      return () => toast.dismiss(loadingToastId);
    }
  }, [isLoading, profile, variant]);

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

  const handleAgreementChange = (type: 'terms' | 'privacy') => {
    setAgreements((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleProfileSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationMessages = Object.keys(formAccount).reduce(
      (acc, key) => {
        const value = formAccount[key as keyof IProfile];
        if (typeof value === 'string') {
          const validationMessage = validateInput(key, value);
          if (validationMessage) acc[key] = validationMessage;
        }
        return acc;
      },
      {} as { [key: string]: string }
    );

    if (Object.keys(validationMessages).length > 0) {
      setValidationMessages(validationMessages);
      return;
    }

    patchProfileInfo(formAccount as Omit<IProfile, 'id'>, {
      onSuccess: () => {
        if (variant === 'setup') {
          navigate('/events');
        } else {
          navigate('/setting');
          toast.success(TOAST_MESSAGE.PROFILE_SAVE_SUCCESS, { icon: '🎉' });
        }
      },
      onError: (error) => {
        toast.error(TOAST_MESSAGE.PROFILE_SAVE_FAILURE);
        console.error('Profile Edit error:', error);
      },
    });
  };

  const isFormValid =
    Object.values(validationMessages).every((validationMessage) => !validationMessage) &&
    !!formAccount.name &&
    !!formAccount.email &&
    (variant === 'edit' || (agreements.terms && agreements.privacy));

  return (
    <form>
      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
        <FormSection
          type="default"
          handleChange={handleChange}
          handleBlur={handleBlur}
          validationMessages={validationMessages}
          formAccount={formAccount}
        />
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
        <FormSection
          type="sns"
          handleChange={handleChange}
          handleBlur={handleBlur}
          validationMessages={validationMessages}
          formAccount={formAccount}
        />
      </div>

      {variant === 'setup' && (
        <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="text-title-3 text-gray-800">서비스 이용 동의</h3>

          <div className="mt-4 space-y-2">
            {agreementItems.map((item) => (
              <Checkbox
                key={item.key}
                checked={agreements[item.key]}
                onChange={() => handleAgreementChange(item.key)}
              >
                <div className="text-body-4 flex items-center">
                  <span className="text-overflow-x-scroll mr-1">[필수]</span>
                  <span className="md:text-body-3">{item.label}</span>
                  <Link
                    to={item.linkTo}
                    className="md:text-body-4 ml-2 text-orange-500 underline hover:text-orange-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.linkText}
                  </Link>
                </div>
              </Checkbox>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 w-full pb-4 md:mt-10 md:pb-0">
        <BaseButton
          isDisabled={!isFormValid || (variant === 'edit' && !isModified)}
          onClick={(e) => handleProfileSubmit(e)}
        >
          {`프로필을 ${variant === 'setup' ? '완성했어요' : '수정할래요'}`}
        </BaseButton>
      </div>
    </form>
  );
}

export default Content;
