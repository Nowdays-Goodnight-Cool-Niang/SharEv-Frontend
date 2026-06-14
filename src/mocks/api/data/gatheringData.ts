import { MyCardResponse, ParticipationCheckResponse, CardResponse } from '@/types/api/event';

const templateText =
  '안녕하세요. 저는 ${introduce} 개발자입니다. 가장 뿌듯했던 경험은 ${proudestExperience} 입니다.';

export const myCardData: MyCardResponse = {
  type: 'FULL',
  cardId: 1,
  name: '홍길동',
  email: 'hong@example.com',
  linkUrls: ['https://github.com/hong', 'https://linkedin.com/in/hong'],
  lastIntroduceTemplateVersion: 1,
  nowIntroduceTemplateVersion: 1,
  introduceTemplateContentText: templateText,
  introductionText: {
    introduce: '백엔드',
    proudestExperience: '해커톤 우승',
  },
};

export const participantsData: CardResponse[] = [
  {
    type: 'FULL',
    cardId: 1,
    name: '홍길동',
    email: 'hong@test.com',
    linkUrls: [],
    lastIntroduceTemplateVersion: 1,
    nowIntroduceTemplateVersion: 1,
    introduceTemplateContentText: templateText,
    introductionText: {
      introduce: '프론트엔드',
      proudestExperience: '삼성 청년 SW 아카데미 수료',
    },
  },
  {
    type: 'MINIMUM',
    cardId: 2,
    name: '이수민',
    email: '',
    linkUrls: [],
    lastIntroduceTemplateVersion: 1,
    nowIntroduceTemplateVersion: 1,
    introduceTemplateContentText: templateText,
    introductionText: {},
  },
  {
    type: 'FULL',
    cardId: 3,
    name: '김재현',
    email: 'jae@test.com',
    linkUrls: ['https://linkedin.com/in/jaehyun', 'https://github.com/jae'],
    lastIntroduceTemplateVersion: 1,
    nowIntroduceTemplateVersion: 1,
    introduceTemplateContentText: templateText,
    introductionText: {
      introduce: '풀스택',
      proudestExperience: '서비스 론칭 경험',
    },
  },
  {
    type: 'MINIMUM',
    cardId: 4,
    name: '최민서',
    email: '',
    linkUrls: [],
    lastIntroduceTemplateVersion: 1,
    nowIntroduceTemplateVersion: 1,
    introduceTemplateContentText: templateText,
    introductionText: {},
  },
];

export const participationCheckData: ParticipationCheckResponse = {
  isParticipant: true,
};

export const cardByPinData: CardResponse = {
  type: 'FULL',
  cardId: 99,
  name: '이승기',
  email: 'lee@example.com',
  linkUrls: ['https://github.com/seunggi'],
  lastIntroduceTemplateVersion: 1,
  nowIntroduceTemplateVersion: 1,
  introduceTemplateContentText: templateText,
  introductionText: {
    introduce: '데이터 사이언스',
    proudestExperience: 'AI 경진대회 우승',
  },
};
