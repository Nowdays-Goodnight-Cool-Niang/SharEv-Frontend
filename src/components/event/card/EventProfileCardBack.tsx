import ExpandableInput from './ExpandableInput';
import { EventProfileStateType, TemplateContent } from '@/types/domain/event';
import { EventProfileState } from '@/constants/event';
import { ISocialLinks } from '@/types/domain/account';
import EmailSvg from '@/assets/icons/ic_email.svg?react';
import GithubSvg from '@/assets/icons/ic_github.svg?react';
import LinkedInSvg from '@/assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';
import BaseButton from '@/components/common/BaseButton';

interface EventProfileCardBack {
  email: string;
  socialLinks: ISocialLinks;
  content: TemplateContent;
  state?: EventProfileStateType;
  fieldValues?: Record<string, string>;
  onFieldChange?: (key: string, value: string) => void;
  onActionButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  isActionButtonDisabled?: boolean;
  showButtons?: boolean;
  showLinkIcons?: boolean;
  isActionButtonLoading?: boolean;
}

const LinkIcons = [
  { name: 'email', icon: EmailSvg },
  { name: 'linkedIn', icon: LinkedInSvg },
  { name: 'github', icon: GithubSvg },
  { name: 'instagram', icon: InstagramSvg },
] as const;

const renderLinkButtons = ({
  email,
  githubUrl,
  linkedinUrl,
  instagramUrl,
}: {
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}) => {
  return LinkIcons.map(({ name, icon }) => {
    const url =
      name === 'email'
        ? `mailto:${email}`
        : githubUrl && name === 'github'
          ? githubUrl
          : linkedinUrl && name === 'linkedIn'
            ? linkedinUrl
            : instagramUrl && name === 'instagram'
              ? instagramUrl
              : undefined;
    const IconComponent = icon;
    const fixedUrl = url?.startsWith('http') || url?.startsWith('mailto') ? url : `https://${url}`;

    return (
      <a
        key={name}
        href={fixedUrl ?? '#'}
        target="_blank"
        onClick={(e) => {
          e.stopPropagation();
          if (!url) e.preventDefault();
        }}
        className={`flex h-6 w-6 items-center justify-center rounded-lg ${
          url ? 'text-gray-600 opacity-90' : 'text-gray-300 opacity-90'
        }`}
      >
        <IconComponent width={16} height={16} />
      </a>
    );
  });
};

function EventProfileCardBack({
  email,
  socialLinks,
  content,
  state = EventProfileState.LOCKED,
  fieldValues,
  onFieldChange,
  onActionButtonClick,
  onCancelButtonClick,
  isActionButtonDisabled = false,
  showButtons = false,
  showLinkIcons = false,
  isActionButtonLoading = false,
}: EventProfileCardBack) {
  return (
    <div
      className={`relative top-0 flex h-full w-full flex-col gap-2 overflow-hidden rounded-3xl bg-gray-50 transition-transform duration-700 transform-style-3d`}
    >
      <div className="z-10 flex-1 overflow-auto px-8 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-museo text-xl tracking-tight text-gray-900">About Me</h1>
          {showLinkIcons && (
            <ul className="flex flex-wrap items-center gap-2">
              {renderLinkButtons({
                email,
                ...socialLinks,
              })}
            </ul>
          )}
        </div>
        <span className="break-all text-base font-normal leading-[2.6rem] tracking-tight text-gray-500">
          {content.blocks.map((block, index) => {
            if (block.type === 'text') {
              return <span key={index}>{block.value}</span>;
            }
            if (block.type === 'input') {
              const field = content.fields[block.fieldKey];
              if (!field) return null;
              return (
                <ExpandableInput
                  key={index}
                  editMode={state === EventProfileState.EDIT}
                  value={
                    fieldValues ? fieldValues[block.fieldKey] : content.fields[block.fieldKey].value
                  }
                  placeholder={field.placeholder}
                  onChange={(value) => {
                    if (onFieldChange) onFieldChange(block.fieldKey, value);
                  }}
                />
              );
            }
            return null;
          })}
        </span>
        <div className={`${showButtons ? 'h-32' : 'h-12'}`}></div>
      </div>

      {showButtons && (
        <div className="absolute bottom-0 z-20 flex w-full gap-2 bg-gradient-to-t from-gray-50 via-gray-50/90 to-gray-50/0 px-6 pb-8">
          {onCancelButtonClick && (
            <button
              className={`duration-400 h-14 w-full min-w-20 flex-1 rounded-2xl bg-gray-200 font-semibold tracking-tight text-gray-400 transition-all disabled:pointer-events-none disabled:cursor-not-allowed`}
              onClick={(e) => {
                e.stopPropagation();
                onCancelButtonClick();
              }}
            >
              취소
            </button>
          )}
          {onActionButtonClick && (
            <BaseButton
              isDisabled={state === EventProfileState.EDIT && isActionButtonDisabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!isActionButtonLoading) onActionButtonClick();
              }}
            >
              {isActionButtonLoading
                ? '저장 중...'
                : state === EventProfileState.EDIT
                  ? '저장하기'
                  : '편집하기'}
            </BaseButton>
          )}
        </div>
      )}
    </div>
  );
}

export default EventProfileCardBack;
