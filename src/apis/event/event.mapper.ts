import { IEventProfile, IInputFieldConfig, TemplateBlock } from '@/types';
import { EventProfileDetailRequest, EventProfileResponse } from '@/types/api.types';

const placeholders = {
  introduce: '자기소개를 입력하세요',
  proudestExperience: '가장 뿌듯했던 경험을 입력하세요',
  toughExperience: '가장 힘들었던 경험을 입력하세요',
} as const;

export function mapEventProfileResponse(response: EventProfileResponse): IEventProfile {
  return {
    profile: {
      id: String(response.profileId),
      name: response.name,
      email: response.email,
      socialLinks: {
        github: response.githubUrl ?? undefined,
        linkedIn: response.linkedinUrl ?? undefined,
        instagram: response.instagramUrl ?? undefined,
      },
    },
    imageIndex: response.iconNumber,
    content: {
      blocks: getDefaultProfileBlocks(),
      fields: extractFieldData({
        introduce: response.introduce ?? '',
        proudestExperience: response.proudestExperience ?? '',
        toughExperience: response.toughExperience ?? '',
      }),
    },
  };
}

export function getDefaultProfileBlocks(): TemplateBlock[] {
  return [
    { type: 'text', value: '안녕하세요. 저는' },
    { type: 'input', fieldKey: 'introduce' },
    { type: 'text', value: ' 개발자입니다. 가장 힘들었던 경험은 ' },
    { type: 'input', fieldKey: 'toughExperience' },
    { type: 'text', value: ' 고, 가장 뿌듯했던 경험은 ' },
    { type: 'input', fieldKey: 'proudestExperience' },
    { type: 'text', value: ' 입니다.' },
  ];
}

export function extractFieldData(
  data: EventProfileDetailRequest
): Record<string, IInputFieldConfig> {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        value,
        placeholder: placeholders[key as keyof typeof placeholders] ?? '',
      };
      return acc;
    },
    {} as Record<string, IInputFieldConfig>
  );
}
