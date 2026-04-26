import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import BaseButton from '@/components/common/BaseButton';
import Checkbox from '@/components/common/Checkbox';
import FormSection from '@/components/profile/FormSection';
import { useQueryAccount } from '@/hooks/useQueryAccount';
import { validateInput } from '@/utils/form';
import { ILink } from '@/types/domain/account';
import { TOAST_MESSAGE } from '@/constants/message';
import { showCustomToast } from '@/utils/showToast';
import toast from 'react-hot-toast';
import { accountAPI } from '@/apis/accounts';
import { useQueryClient } from '@tanstack/react-query';
import Input from '@/components/common/Input';

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
  const queryClient = useQueryClient();
  const { profile, links, isLoading, patchProfileInfo } = useQueryAccount();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formLinks, setFormLinks] = useState<ILink[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [validationMessages, setValidationMessages] = useState<{ [key: string]: string }>({});
  const [isModified, setIsModified] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  useEffect(() => {
    if (variant === 'edit' && profile) {
      const isProfileChanged = formName !== profile.name || formEmail !== profile.email;
      const isLinksChanged =
        formLinks.length !== (links?.length ?? 0) ||
        formLinks.some((fl, i) => fl.id !== links?.[i]?.id);
      setIsModified(isProfileChanged || isLinksChanged);
    }
  }, [formName, formEmail, formLinks, links, profile, variant]);

  useEffect(() => {
    if (!isLoading && profile && variant === 'edit') {
      if (!formName && !formEmail) {
        setFormName(profile.name);
        setFormEmail(profile.email);
      }
    }
    if (!isLoading && links) {
      if (formLinks.length === 0 && links.length > 0) {
        setFormLinks([...links]);
      }
    }
    if (isLoading) {
      const loadingToastId = showCustomToast({ message: TOAST_MESSAGE.PROFILE_LOADING });
      return () => toast.dismiss(loadingToastId);
    }
  }, [isLoading, profile, links, variant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') setFormName(value);
    else if (name === 'email') setFormEmail(value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validationMessage = validateInput(name, value);
    setValidationMessages((prev) => ({
      ...prev,
      [name]: validationMessage || '',
    }));
  };

  const handleAgreementChange = (type: 'terms' | 'privacy') => {
    setAgreements((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  let nextTempId = -1;

  const handleAddLink = () => {
    if (!newLinkUrl.trim()) return;
    const urlValidation = validateInput('url', newLinkUrl);
    if (urlValidation) {
      showCustomToast({ message: urlValidation });
      return;
    }
    setFormLinks((prev) => [...prev, { id: nextTempId--, url: newLinkUrl }]);
    setNewLinkUrl('');
  };

  const handleDeleteLink = (linkId: number) => {
    setFormLinks((prev) => prev.filter((l) => l.id !== linkId));
  };

  const handleProfileSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const messages: { [key: string]: string } = {};
    const nameMsg = validateInput('name', formName);
    if (nameMsg) messages.name = nameMsg;
    const emailMsg = validateInput('email', formEmail);
    if (emailMsg) messages.email = emailMsg;

    if (Object.keys(messages).length > 0) {
      setValidationMessages(messages);
      return;
    }

    try {
      // 링크 변경사항 처리: 삭제된 링크 제거, 새 링크 추가
      const existingIds = new Set(formLinks.map((l) => l.id));
      const deletedLinks = (links ?? []).filter((l) => !existingIds.has(l.id));
      const newLinks = formLinks.filter((l) => l.id < 0);

      await Promise.all(deletedLinks.map((l) => accountAPI.deleteLink(l.id)));
      await Promise.all(newLinks.map((l) => accountAPI.addLink(l.url)));

      // 프로필 정보 저장
      patchProfileInfo(
        { name: formName, email: formEmail },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['accountLinks'] });
            if (variant === 'setup') {
              navigate('/events');
            } else {
              navigate('/setting');
              showCustomToast({ message: TOAST_MESSAGE.PROFILE_SAVE_SUCCESS });
            }
          },
          onError: (error) => {
            showCustomToast({ message: TOAST_MESSAGE.PROFILE_SAVE_FAILURE });
            console.error('Profile Edit error:', error);
          },
        }
      );
    } catch {
      showCustomToast({ message: TOAST_MESSAGE.PROFILE_SAVE_FAILURE });
    }
  };

  const isFormValid =
    Object.values(validationMessages).every((msg) => !msg) &&
    !!formName &&
    !!formEmail &&
    (variant === 'edit' || (agreements.terms && agreements.privacy));

  return (
    <form>
      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
        <FormSection
          handleChange={handleChange}
          handleBlur={handleBlur}
          validationMessages={validationMessages}
          formName={formName}
          formEmail={formEmail}
        />
      </div>

      <div className="mt-4 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-title-3 mb-1 font-semibold tracking-tight text-gray-700 md:mb-2 md:text-base">
          SNS
        </h2>
        {formLinks.length === 0 && (
          <p className="mb-1 text-sm tracking-tight text-gray-400">
            GitHub, LinkedIn 등 SNS 링크를 추가해보세요
          </p>
        )}
        <ul className="space-y-2">
          {formLinks.map((link) => (
            <li key={link.id} className="flex items-center gap-2">
              <span className="flex-1 truncate text-sm text-gray-600">{link.url}</span>
              <button
                type="button"
                onClick={() => handleDeleteLink(link.id)}
                className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-500"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-end gap-2">
          <Input
            placeholder="링크를 입력하세요 (https://...)"
            name="newLink"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddLink}
            className="shrink-0 rounded-xl bg-blue-500 px-4 py-3 text-sm font-medium leading-7 text-white"
          >
            추가
          </button>
        </div>
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
                    className="md:text-body-4 ml-2 text-blue-500 underline hover:text-blue-600"
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
