import ExpandableInput from './ExpandableInput';
import { EventProfileState, IEventProfileContent } from '@/types';

interface EventProfileCardBack {
  content: IEventProfileContent;
  state?: EventProfileState;
  fieldValues: Record<string, string>;
  onFieldChange?: (key: string, value: string) => void;
  onActionButtonClick?: () => void;
  onCancelButtonClick?: () => void;
  isActionButtonDisabled?: boolean;
}

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
      className={`relative top-0 flex h-full w-full flex-col gap-2 overflow-hidden rounded-3xl bg-gray-900 transition-transform duration-700 transform-style-3d`}
    >
      <div className="z-10 flex-1 overflow-auto px-8 pt-8">
        <h1 className="mb-4 text-xl font-medium tracking-tight text-gray-100">About Me</h1>
        <span className="break-all text-base font-normal leading-[2.6rem] tracking-tight text-gray-400 dark:text-gray-50/70">
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
                  value={fieldValues[block.fieldKey] ?? ''}
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

      <div className="absolute bottom-0 z-20 flex w-full gap-2 bg-gradient-to-t from-gray-900 via-gray-900/90 to-gray-900/0 px-6 pb-8">
        {onCancelButtonClick && (
          <button
            className={`duration-400 h-14 w-full min-w-20 flex-1 rounded-2xl bg-gray-700 font-semibold tracking-tight text-white/70 transition-all disabled:pointer-events-none disabled:cursor-not-allowed`}
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
            className={`${state === EventProfileState.EDIT ? 'bg-white text-gray-900 disabled:bg-gray-500 disabled:text-gray-700' : 'bg-white text-gray-900'} duration-400 flex-2 h-14 w-full rounded-2xl font-semibold tracking-tight transition-all disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-400`}
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
