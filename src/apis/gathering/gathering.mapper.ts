import { MyCardResponse, CardResponse, PaginatedCardsResponse } from '@/types/api/event';
import {
  IInputField,
  TemplateBlock,
  IMyEventProfile,
  IPublicEventProfile,
  IPaginatedEventProfiles,
} from '@/types/domain/event';

function parseTemplateBlocks(templateText: string): TemplateBlock[] {
  const blocks: TemplateBlock[] = [];
  const regex = /\$\{(\w+)\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(templateText)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', value: templateText.slice(lastIndex, match.index) });
    }
    blocks.push({ type: 'input', fieldKey: match[1] });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < templateText.length) {
    blocks.push({ type: 'text', value: templateText.slice(lastIndex) });
  }

  return blocks;
}

function extractFieldData(
  introductionText: Record<string, string>,
  templateText: string
): Record<string, IInputField> {
  const fieldKeys = [...templateText.matchAll(/\$\{(\w+)\}/g)].map((m) => m[1]);

  return fieldKeys.reduce(
    (acc, key) => {
      acc[key] = {
        value: introductionText[key] ?? '',
        placeholder: '',
      };
      return acc;
    },
    {} as Record<string, IInputField>
  );
}

function mapMyCard(response: MyCardResponse): IMyEventProfile {
  return {
    type: 'MY',
    cardId: response.cardId,
    name: response.name,
    email: response.email,
    linkUrls: response.linkUrls,
    iconNumber: 0,
    lastIntroduceTemplateVersion: response.lastIntroduceTemplateVersion,
    nowIntroduceTemplateVersion: response.nowIntroduceTemplateVersion,
    template: {
      blocks: parseTemplateBlocks(response.introduceTemplateContentText),
      fields: extractFieldData(response.introductionText, response.introduceTemplateContentText),
    },
  };
}

function mapCard(response: CardResponse): IPublicEventProfile {
  return response.type === 'FULL'
    ? {
        type: 'FULL',
        name: response.name,
        email: response.email,
        linkUrls: response.linkUrls,
        iconNumber: 0,
        template: {
          blocks: parseTemplateBlocks(response.introduceTemplateContentText),
          fields: extractFieldData(
            response.introductionText,
            response.introduceTemplateContentText
          ),
        },
      }
    : {
        type: 'MINIMUM',
        name: response.name,
        iconNumber: 0,
        template: {
          blocks: parseTemplateBlocks(response.introduceTemplateContentText),
          fields: extractFieldData(
            response.introductionText,
            response.introduceTemplateContentText
          ),
        },
      };
}

function mapPaginatedCards(response: PaginatedCardsResponse): IPaginatedEventProfiles {
  return {
    page: response.page,
    profiles: response.content.map(gatheringMapper.mapCard),
  };
}

export const gatheringMapper = {
  mapMyCard,
  mapCard,
  mapPaginatedCards,
  parseTemplateBlocks,
};
