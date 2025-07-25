import ExpandableInput from './ExpandableInput';
import { EventProfileStateType, TemplateContent } from '@/types/domain/event';
import { EventProfileState } from '@/constants/event';
// import GithubSvg from '@/assets/icons/ic_github.svg?react';
// import LinkedInSvg from '@/assets/icons/ic_linkedin.svg?react';
// import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';

interface EventProfileCardBack {
  content: TemplateContent;
  state?: EventProfileStateType;
  fieldValues?: Record<string, string>;
  onFieldChange?: (key: string, value: string) => void;
  onActionButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  isActionButtonDisabled?: boolean;
}

// const socialIcons = [
//   { name: 'linkedIn', icon: LinkedInSvg },
//   { name: 'github', icon: GithubSvg },
//   { name: 'instagram', icon: InstagramSvg },
// ] as const;

// const renderSocialButtons = (socialLinks: ISocialLinks) => {
//   return socialIcons.map(({ name, icon: Icon }) => {
//     const url = socialLinks?.[name];
//     const fixedUrl = url?.startsWith('http') ? url : `https://${url}`;
//     return (
//       <a
//         key={name}
//         href={fixedUrl ?? '#'}
//         target="_blank"
//         onClick={(e) => {
//           e.stopPropagation();
//           if (!url) e.preventDefault();
//         }}
//         className={`flex h-6 w-6 items-center justify-center rounded-lg ${url ? 'text-gray-200 opacity-90' : 'opacity-10'}`}
//       >
//         <Icon width={20} height={20} />
//       </a>
//     );
//   });
// };

function EventProfileCardBack({
  content,
  state = EventProfileState.LOCKED,
  fieldValues,
  onFieldChange,
  onActionButtonClick,
  onCancelButtonClick,
  isActionButtonDisabled = false,
}: EventProfileCardBack) {
  return (
    <div
      className={`relative top-0 flex h-full w-full flex-col gap-2 overflow-hidden rounded-3xl bg-gray-100 transition-transform duration-700 transform-style-3d`}
    >
      <div className="z-10 flex-1 overflow-auto px-8 pt-8">
        <h1 className="mb-4 text-xl tracking-tight text-gray-900">About Me</h1>
        <span className="break-all text-base font-normal leading-[2.6rem] tracking-tight text-gray-500 dark:text-gray-50/70">
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
        <div className="h-32"></div>
      </div>

      <div className="absolute bottom-0 z-20 flex w-full gap-2 bg-gradient-to-t from-gray-100 via-gray-100/90 to-gray-100/0 px-6 pb-8">
        {onCancelButtonClick && (
          <button
            className={`duration-400 h-14 w-full min-w-20 flex-1 rounded-2xl bg-gray-400 font-semibold tracking-tight text-gray-200 transition-all disabled:pointer-events-none disabled:cursor-not-allowed`}
            onClick={(e) => {
              e.stopPropagation();
              onCancelButtonClick();
            }}
          >
            취소
          </button>
        )}
        {onActionButtonClick && (
          <button
            disabled={isActionButtonDisabled}
            className={`${state === EventProfileState.EDIT ? 'bg-white text-gray-900 disabled:bg-gray-200 disabled:text-gray-400' : 'bg-white text-gray-900'} duration-400 flex-2 h-14 w-full rounded-2xl font-semibold tracking-tight transition-all disabled:pointer-events-none disabled:cursor-not-allowed`}
            onClick={(e) => {
              e.stopPropagation();
              onActionButtonClick();
            }}
          >
            {state === EventProfileState.EDIT ? '저장하기' : '편집하기'}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventProfileCardBack;

{
  /* <ul className="absolute bottom-6 flex flex-wrap items-center gap-3">
<li className="flex h-7 w-7 flex-col items-center justify-center">
  <a href={`mailto:${profile.email}`} onClick={(e) => e.stopPropagation()}>
    <EmailSvg width={20} height={20} />
  </a>
</li>
{renderSocialButtons()}
</ul> */
}
