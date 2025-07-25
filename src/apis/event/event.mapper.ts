import { placeholders } from '@/constants/event';
import { MyEventProfileResponse, PublicProfileResponse, ProfileContent } from '@/types/api/event';
import {
  IInputField,
  TemplateBlock,
  IMyEventProfile,
  IPublicEventProfile,
} from '@/types/domain/event';

function mapMyEventProfile(response: MyEventProfileResponse): IMyEventProfile {
  return {
    type: 'my',
    id: String(response.profileId),
    name: response.name,
    email: response.email,
    socialLinks: {
      github: response.githubUrl ?? undefined,
      linkedIn: response.linkedinUrl ?? undefined,
      instagram: response.instagramUrl ?? undefined,
    },
    iconNumber: response.iconNumber,
    pinNumber: response.pinNumber,
    template: {
      blocks: getDefaultProfileBlocks(),
      fields: extractFieldData({
        introduce: response.introduce ?? '',
        proudestExperience: response.proudestExperience ?? '',
        toughExperience: response.toughExperience ?? '',
      }),
    },
    registerRequireFlag: response.registerRequireFlag,
  };
}
function mapPublicEventProfile(response: PublicProfileResponse): IPublicEventProfile {
  return response.type === 'full'
    ? {
        type: 'full',
        name: response.name,
        email: response.email,
        socialLinks: {
          github: response.githubUrl ?? undefined,
          linkedIn: response.linkedinUrl ?? undefined,
          instagram: response.instagramUrl ?? undefined,
        },
        relationFlag: response.relationFlag,
        iconNumber: response.iconNumber,
        template: {
          blocks: getDefaultProfileBlocks(),
          fields: extractFieldData({
            introduce: response.introduce ?? '',
            proudestExperience: response.proudestExperience ?? '',
            toughExperience: response.toughExperience ?? '',
          }),
        },
      }
    : {
        type: 'minimum',
        name: response.name,
        iconNumber: response.iconNumber,
        relationFlag: response.relationFlag,
        template: {
          blocks: getDefaultProfileBlocks(),
          fields: extractFieldData({
            introduce: null,
            proudestExperience: response.proudestExperience ?? '',
            toughExperience: null,
          }),
        },
      };
}

function getDefaultProfileBlocks(): TemplateBlock[] {
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

function extractFieldData(data: ProfileContent): Record<string, IInputField> {
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      acc[key] = {
        value,
        placeholder: placeholders[key as keyof typeof placeholders] ?? '',
      };
      return acc;
    },
    {} as Record<string, IInputField>
  );
}

export const eventMapper = {
  mapMyEventProfile,
  mapPublicEventProfile,
};
