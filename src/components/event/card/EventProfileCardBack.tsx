import ExpandableInput from './ExpandableInput';
import { EventProfileState, IEventProfileContent } from '@/types';
import gradientImage from '@/assets/images/img_gradient.png';

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
      className={`relative top-0 flex aspect-[3/4] h-full w-full flex-col gap-2 rounded-3xl border border-white/20 bg-gradient-to-br from-white/0 via-white/10 to-indigo-900/50 transition-transform duration-700 transform-style-3d`}
    >
      <div className="absolute top-0 h-full">
        <img src={gradientImage} className="h-full object-cover opacity-5" alt="" />
      </div>
      <div className="flex-1 overflow-auto px-6 pt-6">
        <span className="break-all text-base font-normal leading-[2.8rem] tracking-tight text-gray-50/70">
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
      </div>

      <div className="flex gap-2 px-6 pb-8">
        {onCancelButtonClick && (
          <button
            className={`duration-400 h-14 w-full min-w-20 flex-1 rounded-xl bg-white/10 font-semibold tracking-tight text-white/70 transition-all disabled:pointer-events-none disabled:cursor-not-allowed`}
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
            className={`${state === EventProfileState.EDIT ? 'bg-white text-gray-700 disabled:bg-white/20 disabled:text-white/25' : 'border border-white/40 text-white'} duration-400 flex-2 h-14 w-full rounded-xl font-semibold tracking-tight transition-all disabled:pointer-events-none disabled:cursor-not-allowed`}
            onClick={(e) => {
              e.stopPropagation();
              onActionButtonClick();
            }}
            disabled={isActionButtonDisabled}
          >
            {state === EventProfileState.EDIT ? '저장하기' : '편집하기'}
          </button>
        )}
      </div>
    </div>
  );
}

export default EventProfileCardBack;
