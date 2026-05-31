import { CardResponse } from '@/types/api/event';

const templateText =
  '안녕하세요. 저는 ${introduce} 개발자입니다. 가장 뿌듯했던 경험은 ${proudestExperience} 입니다.';

export const createMockCard = (overrides?: Partial<CardResponse>): CardResponse => ({
  type: 'FULL',
  cardId: 1,
  name: '테스트 유저',
  email: 'test@example.com',
  linkUrls: ['https://github.com/test'],
  lastIntroduceTemplateVersion: 1,
  nowIntroduceTemplateVersion: 1,
  introduceTemplateContentText: templateText,
  introductionText: {
    introduce: '백엔드',
    proudestExperience: '프로젝트 완성',
  },
  ...overrides,
});

export const createMockCards = (count: number): CardResponse[] => {
  return Array.from({ length: count }, (_, i) =>
    createMockCard({
      cardId: i + 1,
      name: `유저 ${i + 1}`,
      email: i % 3 === 0 ? `user${i + 1}@example.com` : '',
      type: i % 3 === 0 ? 'FULL' : 'MINIMUM',
      linkUrls: i % 3 === 0 ? [`https://github.com/user${i + 1}`] : [],
      introductionText:
        i % 3 === 0
          ? { introduce: `개발자 ${i + 1}`, proudestExperience: `경험 ${i + 1}` }
          : {},
    })
  );
};
