import { useState } from 'react';
import ShareCardInput from './ExpandableInput';
import CharacterSvg from '@/assets/icons/ic_character_1.svg?react';
import GithubSvg from '@/assets/icons/ic_github.svg?react';
import LinkedInSvg from '@/assets/icons/ic_linkedin.svg?react';
import InstagramSvg from '@/assets/icons/ic_instagram.svg?react';

function EventProfileCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped((prev) => !prev)}
      className="w-full max-w-[22rem] perspective-1000"
    >
      <div
        className={`relative aspect-[3/4] w-full transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute inset-0 backface-hidden">
          <EventProfileFront />
        </div>
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          <EventProfileBack />
        </div>
      </div>
    </div>
  );
}

function EventProfileFront() {
  return (
    <div
      className={`relative aspect-[3/4] h-full w-full min-w-60 overflow-hidden rounded-3xl bg-gradient-to-bl from-purple-500 via-blue-900 to-indigo-900 transform-style-3d`}
    >
      <div className="absolute bottom-0 flex aspect-square w-full flex-col items-end justify-end">
        <div className="translate-x-8 translate-y-16">
          <CharacterSvg width={300} height={300} />
        </div>
      </div>
      <div className="ml-8 mr-6 mt-6">
        <p className="mb-6 text-right text-sm text-white/30">CODE:ME</p>
        <h2 className="mb-4 text-3xl font-semibold leading-7 tracking-tight text-white">김주호</h2>
        <p className="mb-2 text-base leading-7 tracking-tight text-gray-100/80">zuhu@gmail.com</p>
        <ul className="flex flex-wrap gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100/10 bg-gray-100/10 text-gray-200">
            <GithubSvg width={24} height={24} />
          </button>
          <button
            disabled
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100/10 bg-gray-100/10 text-gray-200 disabled:border-gray-100/5 disabled:bg-gray-100/5 disabled:text-gray-100/5"
          >
            <LinkedInSvg width={24} height={24} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100/10 bg-gray-100/10 text-gray-200">
            <InstagramSvg width={24} height={24} />
          </button>
        </ul>
      </div>
    </div>
  );
}

function EventProfileBack() {
  const eventCardTemplate: IEventCardTemplate = {
    blocks: [
      { type: 'text', value: '안녕하세요. 저는 ' },
      { type: 'input', fieldKey: 'intro' },
      { type: 'text', value: ' 개발자입니다. 가장 힘들었던 경험은 ' },
      { type: 'input', fieldKey: 'hardestMoment' },
      { type: 'text', value: ' 이고, 가장 뿌듯했던 경험은 ' },
      { type: 'input', fieldKey: 'proudestMoment' },
      { type: 'text', value: ' 입니다.' },
    ],
    fields: {
      intro: {
        value: '',
        placeholder: '스스로를 한 문장으로 소개해 보세요',
      },
      hardestMoment: {
        value: '',
        placeholder: '힘들었던 경험을 적어주세요',
      },
      proudestMoment: {
        value: '',
        placeholder: '뿌듯했던 경험을 적어주세요',
      },
    },
  };

  const [fieldValues, setFieldValues] = useState(
    Object.fromEntries(
      Object.entries(eventCardTemplate.fields).map(([key, { value }]) => [key, value])
    )
  );

  const updateFieldValue = (key: string, newValue: string) => {
    console.log(key, newValue);
    setFieldValues((prev) => ({ ...prev, [key]: newValue }));
  };

  return (
    <div
      className={`absolute top-0 flex aspect-[3/4] h-full w-full flex-col gap-2 rounded-3xl bg-gradient-to-br from-purple-500 via-blue-900 to-indigo-900 px-6 pb-8 pt-6 transition-transform duration-700 transform-style-3d`}
    >
      <div className="flex-1 overflow-auto">
        <span className="break-all text-base font-normal leading-[2.8rem] tracking-tight text-gray-200">
          {eventCardTemplate.blocks.map((block, index) => {
            if (block.type === 'text') {
              return <span key={index}>{block.value}</span>;
            }
            if (block.type === 'input') {
              const field = eventCardTemplate.fields[block.fieldKey];
              if (!field) return null;
              return (
                <ShareCardInput
                  key={index}
                  value={fieldValues[block.fieldKey] ?? ''}
                  placeholder={field.placeholder}
                  onChange={(value) => updateFieldValue(block.fieldKey, value)}
                />
              );
            }
            return null;
          })}
        </span>
      </div>

      <button
        className={`duration-400 h-14 w-full rounded-xl bg-white font-semibold tracking-tight text-gray-700 transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25`}
        onClick={() => {}}
      >
        저장하기
      </button>
    </div>
  );
}

export default EventProfileCard;
